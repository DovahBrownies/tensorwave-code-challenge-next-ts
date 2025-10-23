const STOCKS: Record<string, Stock> = {
	AAPL: { symbol: "AAPL", name: "Apple Inc.", image_url: '/company-logos/aapl.png' },
	GOOGL: { symbol: "GOOGL", name: "Alphabet Inc.", image_url: '/company-logos/googl.png' },
	MSFT: { symbol: "MSFT", name: "Microsoft Corporation", image_url: '/company-logos/msft.png' },
	AMZN: { symbol: "AMZN", name: "Amazon.com, Inc.", image_url: '/company-logos/amzn.png' },
	TSLA: { symbol: "TSLA", name: "Tesla, Inc.", image_url: '/company-logos/tsla.png' },
	META: { symbol: "META", name: "Meta Platforms, Inc.", image_url: '/company-logos/meta.png' },
	NFLX: { symbol: "NFLX", name: "Netflix, Inc.", image_url: '/company-logos/nflx.png' },
	NVDA: { symbol: "NVDA", name: "NVIDIA Corporation", image_url: '/company-logos/nvda.png' },
	JPM: { symbol: "JPM", name: "JPMorgan Chase & Co.", image_url: '/company-logos/jpm.png' },
	V: { symbol: "V", name: "Visa Inc.", image_url: '/company-logos/v.png' },
	DIS: { symbol: "DIS", name: "The Walt Disney Company", image_url: '/company-logos/dis.png' },
	PYPL: { symbol: "PYPL", name: "PayPal Holdings, Inc.", image_url: '/company-logos/pypl.png' },
	ADBE: { symbol: "ADBE", name: "Adobe Inc.", image_url: '/company-logos/adbe.png' },
	INTC: { symbol: "INTC", name: "Intel Corporation", image_url: '/company-logos/intc.png' },
	CSCO: { symbol: "CSCO", name: "Cisco Systems, Inc.", image_url: '/company-logos/csco.png' },
	ORCL: { symbol: "ORCL", name: "Oracle Corporation", image_url: '/company-logos/orcl.png' },
	CRM: { symbol: "CRM", name: "Salesforce, Inc.", image_url: '/company-logos/crm.png' },
	IBM: { symbol: "IBM", name: "International Business Machines Corporation", image_url: '/company-logos/ibm.png' },
	QCOM: { symbol: "QCOM", name: "QUALCOMM Incorporated", image_url: '/company-logos/qcom.png' },
	TXN: { symbol: "TXN", name: "Texas Instruments Incorporated", image_url: '/company-logos/txn.png' },
}

export default STOCKS;