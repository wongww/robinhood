import { createHeaders } from "./payload.js";
import { INSTRUMENT_URL, QUOTE_URL } from "./urls.js";

export const getStockPrice = async (symbol: string) => {
  const headers = createHeaders();
  const results = await fetch(`${QUOTE_URL}?symbols=${symbol}`, {
    headers: headers,
  });
  const data = await results.json();
  return data.results[0]["ask_price"];
};

export const getInstrument = async (symbol: string) => {
  const results = await fetch(`${INSTRUMENT_URL}${symbol}`, {
    headers: createHeaders(),
  });
  const data = await results.json();
  return data.results[0].url;
};
