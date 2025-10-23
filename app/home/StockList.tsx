import Tile from "@components/Tile";
import ElementFadeIn, { ElementFadeInWrapper } from "@components/ElementFadeIn";
import Image from "next/image";
import Link from "next/link";
import { API_ENDPOINTS } from "@utils/api";
import styles from "./home.module.scss";

const getAllStockSymbols = async () => {
  const res = await fetch(API_ENDPOINTS.ALL_STOCKS.url);
  return await res.json();
};

export default async function StockList() {
  const stockSymbols = await getAllStockSymbols();
  return (
    <div className={styles['stock-tickers__container']}>
      <ElementFadeInWrapper>
        {stockSymbols.map((stock: Stock, i: number) => (
          <ElementFadeIn
            key={stock.symbol}
            index={i}
          >
            <Link href={`/stock/${stock.symbol}`}>
              <Tile withHoverEffect>
                <div className={styles['stock-ticker']}>
                  <Image
                    src={stock.image_url}
                    alt={`${stock.name} logo`}
                    width={250}
                    height={250}
                  />
                  <small>{stock.symbol}</small>
                  <h2>{stock.name}</h2>
                </div>
              </Tile>
            </Link>
          </ElementFadeIn>
        ))}
      </ElementFadeInWrapper>
    </div>
  );
}