'use client';

import { useState, useMemo } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip as ChartJsTooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// Using fixture data for development and testing since the API has a rate limit
// import TIME_SERIES_DAILY_FIXTURE from '@fixtures/timeSeriesDaily';
import styles from './linechart.module.scss';

const LINE_COLOR = '#2281fc';
const DOT_COLOR = '#11478e';
const DEFAULT_DATE_RANGE = 90; // days

interface LineChartComponentProps {
	title?: string;
	data: Record<string, TimeSeriesEntry>;
	withDateRangeFilter?: boolean;
}

// Define the very unusual keys return from the API
const KEYS: Record<string, keyof TimeSeriesEntry> = {
	OPEN: "1. open",
	HIGH: "2. high",
	LOW: "3. low",
	CLOSE: "4. close",
	VOLUME: "5. volume",
};

const presentData = (data: Record<string, TimeSeriesEntry>) => {
	const presentedData = [];
	for (const [date, values] of Object.entries(data)) {
		if (values && typeof values === 'object') {
			presentedData.push({
				name: date,
				close: Number(values[KEYS.CLOSE]),
				open: Number(values[KEYS.OPEN]),
				high: Number(values[KEYS.HIGH]),
				low: Number(values[KEYS.LOW]),
				volume: Number(values[KEYS.VOLUME]),
			});
		}
	}
	// Optionally sort by date ascending (oldest first)
	presentedData.sort((a, b) => (a.name < b.name ? -1 : 1));
	return presentedData;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartJsTooltip, Legend);

const LineChartComponent = ({ title = '', data = {}, withDateRangeFilter = false }: LineChartComponentProps) => {
	const formattedData = useMemo(() => presentData(data), [data]);
	// const mockFormattedData = useMemo(() => presentData(TIME_SERIES_DAILY_FIXTURE), []);

	const allDates = useMemo(() => formattedData.map(d => d.name).sort(), [formattedData]);
	const defaultStart = allDates.length > DEFAULT_DATE_RANGE ? allDates[allDates.length - DEFAULT_DATE_RANGE] : allDates[0];
	const defaultEnd = allDates[allDates.length - 1];
	const [range, setRange] = useState({
		start: defaultStart,
		end: defaultEnd,
	});

	const filteredData = useMemo(
		() =>
			formattedData.filter(
				d => d.name >= range.start && d.name <= range.end
			),
		[formattedData, range]
	);

	const chartJsData = useMemo(() => ({
		labels: filteredData.map(d => d.name),
		datasets: [
			{
				label: 'Close',
				data: filteredData.map(d => d.close),
				borderColor: LINE_COLOR,
				tension: 0.3,
				pointRadius: 3,
				pointBackgroundColor: DOT_COLOR,
				fill: true,
			},
		],
	}), [filteredData]);

	const chartJsOptions = useMemo(() => {
		// Helper to get percent change from previous day
		const getPercentChange = (index: number) => {
			if (index === 0) return null;
			const prev = filteredData[index - 1]?.close;
			const curr = filteredData[index]?.close;
			if (prev && curr) {
				return ((curr - prev) / prev) * 100;
			}
			return null;
		};

		return {
			responsive: true,
			plugins: {
				legend: { display: false },
				title: { display: false },
				tooltip: {
					mode: 'index' as const,
					intersect: false,
					callbacks: {
						title: (items: { label?: string }[]) => {
							if (items.length > 0) {
								return items[0].label || '';
							}
							return '';
						},
						label: () => '', // We're going to skip the default label and put everything in the `afterBody`
						afterBody: (items: import('chart.js').TooltipItem<'line'>[]) => {
							if (!items.length) return [];
							const idx = items[0].dataIndex;
							const d = filteredData[idx];
							if (!d) return [];
							const close = d.close;
							const volume = d.volume;
							const percentChange = getPercentChange(idx);
							const lines = [
								`Close: $${close.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
								`Volume: ${volume.toLocaleString()}`
							];
							if (percentChange !== null) {
								const sign = percentChange > 0 ? '+' : '';
								lines.push(`Change: ${sign}${percentChange.toFixed(2)}%`);
							}
							return lines;
						},
					},
				},
			},
			scales: {
				x: { display: true, title: { display: true, text: 'Date' } },
				y: { display: true, title: { display: true, text: 'Close' } },
			},
			maintainAspectRatio: false,
		};
	}, [filteredData]);

	return (
		<div>
			<div className={styles['linechart__header']}>
				{title && <h2>{title}</h2>}
				{withDateRangeFilter && (
					<div className={styles['date-range-filter']}>
						<label>
							<b>Start:</b>
							<input
								type="date"
								value={range.start}
								min={allDates[0]}
								max={range.end}
								onChange={ev => setRange(r => ({ ...r, start: ev.target.value }))}
							/>
						</label>
						<label>
							<b>End:</b>
							<input
								type="date"
								value={range.end}
								min={range.start}
								max={allDates[allDates.length - 1]}
								onChange={ev => setRange(r => ({ ...r, end: ev.target.value }))}
							/>
						</label>
					</div>
				)}
			</div>
			<div style={{ width: '100%', height: '50vh', maxWidth: '150rem' }}>
				<Line data={chartJsData} options={chartJsOptions} />
			</div>
		</div>
	);
}

export default LineChartComponent;