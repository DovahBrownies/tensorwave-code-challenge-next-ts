import { API_ENDPOINTS, buildUrl } from "@utils/api";

interface StockPageParams {
  symbol: string;
}

const getStockData = async (symbol: string) => {
	const res = await fetch(buildUrl(API_ENDPOINTS.STOCK.url, { symbol }));
	return await res.json();
}

export default async function Stock({ params }: { params: StockPageParams }) {
  const symbol = (await params)?.symbol;
  const stockData = await getStockData(symbol);
  console.log("[ 🤔 Debug ] | Stock | stockData:", stockData)

  return (
    <main>
			Stock details
    </main>
  );
}