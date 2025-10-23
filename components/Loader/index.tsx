
'use client';

import { Fragment, useState, useMemo } from 'react';
import styles from './loader.module.scss';

const NUMBER_OF_FLARES = 5;
const FLARE_ANIMATION_OFFSET = 54;
const LOADING_PHRASES = [
	'Fetching market data...',
	'Analyzing stock trends...',
	'Compiling financial reports...',
	'Loading investment insights...',
	'Preparing your dashboard...',
	'Almost there...',
	'Just a moment...',
	'Making you rich...',
	'Figuring out the stock market...',
	'It\'s buy high and sell low, right?',
	'Diamond hands loading...',
	'Calculating your future wealth...',
	'Searching for the next big thing...',
	'Reticulating splines...',
]

interface LoaderProps {
	withBackdrop?: boolean;
}

// The offset range (-54px to +54px) is chosen to match the visual width of the large base (7.5rem = 120px),
// so flares can appear anywhere above the base without overflowing too far left/right.
const getRandomOffset = () => {
	return (Math.random() * (FLARE_ANIMATION_OFFSET * 2)) - FLARE_ANIMATION_OFFSET;
}

const Backdrop = ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.loader__backdrop}>{children}</div>;
}

const Loader = ({ withBackdrop }: LoaderProps) => {
	const flareOffsets = useMemo(() => Array.from({ length: NUMBER_OF_FLARES }, getRandomOffset), []);
	const Wrapper = withBackdrop ? Backdrop : Fragment;
	const [loadingPhrase] = useState( // Storing this in a state to enforce purity
		() => LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)]
	);

	return (
		<Wrapper>
			<div className={styles.loader}>
				{flareOffsets.map((offset, i) => (
					<div
						key={i}
						className={styles.loader__flare}
						style={{ '--flare-x': `${offset.toFixed(1)}px` } as React.CSSProperties}
					>
						💲
					</div>
				))}
				<div className={styles.loader__base}>🏦</div>
				<span className={styles.loader__text}>
					{loadingPhrase}
				</span>
			</div>
		</Wrapper>
	);
}

export default Loader;