import styles from './tile.module.scss';

interface TileProps {
	children: React.ReactNode;
	withHoverEffect?: boolean;
}

const Tile = ({ children, withHoverEffect }: TileProps) => {
	return <div className={`${styles.tile} ${withHoverEffect ? styles['tile--hover'] : ''}`}>{children}</div>;
}

export default Tile;