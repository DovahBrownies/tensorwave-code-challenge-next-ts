import STOCKS_FIXTURE from "@fixtures/stocks";

const EMULATED_API_RESPONSE_DELAY = 1000; // ms
const ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query";
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || "";

async function fetchAlphaVantage(endpoint: string, params: Record<string, string>) {
	const url = new URL(ALPHA_VANTAGE_BASE_URL);
	url.searchParams.set("function", endpoint);
	Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
	url.searchParams.set("apikey", ALPHA_VANTAGE_API_KEY);

	const res = await fetch(url.toString());
	return res.json();
}

export async function GET(request: Request, context: { params: Promise<{ symbol: string }> }) {
	const { symbol } = await context.params;
	await new Promise((resolve) => setTimeout(resolve, EMULATED_API_RESPONSE_DELAY));

	try {
		const [overview, timeSeriesDaily] = await Promise.all([
			fetchAlphaVantage("OVERVIEW", { symbol }),
			fetchAlphaVantage("TIME_SERIES_DAILY", { symbol, outputsize: "full" }),
		]);

		const responseObj = {
			overview: {
				...overview,
				Logo: STOCKS_FIXTURE[symbol].image_url, // CamelCase to follow existing structure
			},
			time_series: {
				meta_data: timeSeriesDaily["Meta Data"],
				time_series_daily: timeSeriesDaily["Time Series (Daily)"],
			},
		};

		return new Response(JSON.stringify(responseObj), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error: unknown) {
		let errorMessage = "Unknown error";
		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === "string") {
			errorMessage = error;
		}
		return new Response(
			JSON.stringify({ error: "Failed to fetch stock data", details: errorMessage }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}