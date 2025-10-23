'use client';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import styles from './header.module.scss';

const Header = () => {
	const router = useRouter();
	const params = useParams();
	const { symbol } = params;

	return (
		<div className={styles.header}>
			TensorWave Stock App{symbol ? ` - ${symbol}` : ''}
			{
				symbol && (
					<button className={styles['header__back-button']} onClick={() => router.back()}>
						⬅️ Go back
					</button>
				)
			}
		</div>
	);
}

export default Header;