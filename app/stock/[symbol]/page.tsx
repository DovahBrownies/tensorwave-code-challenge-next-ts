import { API_ENDPOINTS, buildUrl } from "@utils/api";
import Image from "next/image";
import styles from "./stock.module.scss";

const FALLBACK_LOGO_URL = "/company-logos/placeholder.png";
const FALLBACK_STRING = "N/A";

interface StockPageParams {
  symbol: string;
}

const getStockData = async (symbol: string) => {
	const res = await fetch(buildUrl(API_ENDPOINTS.STOCK.url, { symbol }));
	return await res.json();
}

export default async function Stock({ params }: { params: StockPageParams }) {
  const symbol = (await params)?.symbol;
  const { overview } = await getStockData(symbol);

  return (
    <main>
			<div className={styles.stock__header}>
				<Image
					src={overview.Logo || FALLBACK_LOGO_URL}
					alt={`${overview.Name} logo`}
					width={150}
					height={150}
				/>
				<div>
					<h1 className={styles.stock__name}>{overview.Name}</h1>
					<h2 className={styles.stock__symbol}>{overview.Symbol}</h2>
				</div>
			</div>
			<p className={styles.stock__description}>{overview.Description || FALLBACK_STRING}</p>
			<div className={styles.stock__details}>
				<span><b>Exchange:</b> {overview.Exchange || FALLBACK_STRING}</span>
				<span><b>Sector:</b> {overview.Sector || FALLBACK_STRING}</span>
				<span><b>Industry:</b> {overview.Industry || FALLBACK_STRING}</span>
				<span><b>Market Cap:</b> {overview.MarketCapitalization || FALLBACK_STRING}</span>
			</div>
    </main>
  );
}