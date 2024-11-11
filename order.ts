import { ORDER_URL } from "./urls.js";
import { createBuyPayload, createHeaders } from "./payload.js";

export const order = async (symbol: string, accountNumber: number) => {
  symbol = symbol.toUpperCase().trim();
  const payload = await createBuyPayload(symbol, accountNumber);

  const response = await fetch(`${ORDER_URL}${accountNumber}`, {
    method: "POST",
    headers: createHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();
};
