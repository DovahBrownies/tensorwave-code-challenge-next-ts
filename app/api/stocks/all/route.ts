import STOCKS_FIXTURE from "@fixtures/stocks";

const EMULATED_API_RESPONSE_DELAY = 1000; // ms
const STOCKS_TO_RETURN: Stock[] = Object.values(STOCKS_FIXTURE);

export async function GET() {
	await new Promise((resolve) => setTimeout(resolve, EMULATED_API_RESPONSE_DELAY));
	return new Response(JSON.stringify(STOCKS_TO_RETURN), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}