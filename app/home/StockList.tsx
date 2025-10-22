import Tile from "@components/Tile";
import Image from "next/image";
import styles from "./home.module.scss";
import URLS from "@constants/urls";

const getAllStockSymbols = async () => {
  const res = await fetch(URLS.ALL_STOCKS);
  return await res.json();
};

export default async function StockList() {
  const stockSymbols = await getAllStockSymbols();
  return (
    <div className={styles['stock-tickers__container']}>
      {stockSymbols.map((stock: Stock) => (
        <Tile key={stock.symbol} withHoverEffect>
          <div className={styles['stock-ticker']}>
            <Image src={stock.image_url} alt={`${stock.name} logo`} width={250} height={250} />
            <small>{stock.symbol}</small>
            <h2>{stock.name}</h2>
          </div>
        </Tile>
      ))}
    </div>
  );
}