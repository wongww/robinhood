import { createHeaders } from "./payload.js";
import { ACCOUNT_URL } from "./urls.js";

export const getAccountInfo = async (accountNumber: number) => {
  const results = await fetch(`${ACCOUNT_URL}${accountNumber}`, {
    headers: createHeaders(),
  });
  const data = await results.json();
  return data.url;
};
