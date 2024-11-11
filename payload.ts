import { generateDeviceToken } from "./helper.js";
import { getAccountInfo } from "./profiles.js";
import { getStockPrice, getInstrument } from "./stocks.js";

export const createHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.ACCESS_TOKEN,
  };
};

export const createLoginPayload = (): {
  [index: string]: string | number;
} => {
  const grant_type = "password";
  const challenge_type = "sms";
  const device_token = process.env.DEVICE_TOKEN ?? generateDeviceToken();
  if (process.env.DEVICE_TOKEN === undefined) {
    process.env.DEVICE_TOKEN = device_token;
  }
  return {
    client_id: process.env.CLIENT_ID,
    expires_in: 734000,
    grant_type: grant_type,
    scope: "internal",
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    challenge_type: challenge_type,
    device_token: device_token,
    mfa_token: "",
  };
};

export const createBuyPayload = async (
  symbol: string,
  accountNumber: number
) => {
  const price = await getStockPrice(symbol);
  const account = await getAccountInfo(accountNumber);
  const instrument = await getInstrument(symbol);
  return {
    account: account,
    instrument: instrument,
    symbol: symbol,
    price: price,
    quantity: 1,
    time_in_force: "gtc",
    trigger: "immediate",
    type: "limit",
    side: "buy",
    preset_percent_limit: "0.05",
    market_hours: "regular_hours",
    extended_hours: false,
    order_form_version: 4,
    device_token: process.env.DEVICE_TOKEN,
  };
};
