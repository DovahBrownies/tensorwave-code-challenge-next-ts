const INTERNAL_PROXY_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type AllStocksUrlParams = never;
type StockUrlParams = "symbol";

const API_ENDPOINTS = {
  ALL_STOCKS: {
    url: `${INTERNAL_PROXY_BASE_URL}/api/stocks/all`,
    urlParams: [] as AllStocksUrlParams[],
  },
  STOCK: {
    url: `${INTERNAL_PROXY_BASE_URL}/api/stocks/{symbol}`,
    urlParams: ["symbol"] as StockUrlParams[],
  }
} as const;

export default API_ENDPOINTS;