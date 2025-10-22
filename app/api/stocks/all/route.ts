const EMULATED_API_RESPONSE_DELAY = 1000; // ms
const STOCKS_TO_RETURN: Stock[] = [
	{ symbol: "AAPL", name: "Apple Inc.", image_url: '/company-logos/aapl.png' },
	{ symbol: "GOOGL", name: "Alphabet Inc.", image_url: '/company-logos/googl.png' },
	{ symbol: "MSFT", name: "Microsoft Corporation", image_url: '/company-logos/msft.png' },
	{ symbol: "AMZN", name: "Amazon.com, Inc.", image_url: '/company-logos/amzn.png' },
	{ symbol: "TSLA", name: "Tesla, Inc.", image_url: '/company-logos/tsla.png' },
	{ symbol: "META", name: "Meta Platforms, Inc.", image_url: '/company-logos/meta.png' },
	{ symbol: "NFLX", name: "Netflix, Inc.", image_url: '/company-logos/nflx.png' },
	{ symbol: "NVDA", name: "NVIDIA Corporation", image_url: '/company-logos/nvda.png' },
	{ symbol: "JPM", name: "JPMorgan Chase & Co.", image_url: '/company-logos/jpm.png' },
	{ symbol: "V", name: "Visa Inc.", image_url: '/company-logos/v.png' },
	{ symbol: "DIS", name: "The Walt Disney Company", image_url: '/company-logos/dis.png' },
	{ symbol: "PYPL", name: "PayPal Holdings, Inc.", image_url: '/company-logos/pypl.png' },
	{ symbol: "ADBE", name: "Adobe Inc.", image_url: '/company-logos/adbe.png' },
	{ symbol: "INTC", name: "Intel Corporation", image_url: '/company-logos/intc.png' },
	{ symbol: "CSCO", name: "Cisco Systems, Inc.", image_url: '/company-logos/csco.png' },
	{ symbol: "ORCL", name: "Oracle Corporation", image_url: '/company-logos/orcl.png' },
	{ symbol: "CRM", name: "Salesforce, Inc.", image_url: '/company-logos/crm.png' },
	{ symbol: "IBM", name: "International Business Machines Corporation", image_url: '/company-logos/ibm.png' },
	{ symbol: "QCOM", name: "QUALCOMM Incorporated", image_url: '/company-logos/qcom.png' },
	{ symbol: "TXN", name: "Texas Instruments Incorporated", image_url: '/company-logos/txn.png' },
];

export async function GET() {
	// Emulate 100ms delay
	await new Promise((resolve) => setTimeout(resolve, EMULATED_API_RESPONSE_DELAY));
	return new Response(JSON.stringify(STOCKS_TO_RETURN), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}