import { createLoginPayload } from "./payload.js";
import { AUTH_URL } from "./urls.js";
import PromptSync from "prompt-sync";
import { writeFileSync, readFileSync } from "node:fs";

var prompt = PromptSync();

export async function login() {
  const fileData = readFileSync("data.json", "utf8");
  const parsedData = JSON.parse(fileData);
  if (parsedData.refresh_token) {
    await getAccessToken(parsedData.refresh_token);
  } else {
    const payload = createLoginPayload();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload, (key, value) => {
        // Exclude undefined or empty string values
        return value === "" ? undefined : value;
      }),
    };
    let response = await fetch(AUTH_URL, options);

    let mfaToken = prompt("Please type in the MFA code:");

    payload.mfa_code = mfaToken;
    options.body = JSON.stringify(payload);

    response = await fetch(AUTH_URL, options);

    let data = await response.json();
    const dataJson = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
    process.env.REFRESH_TOKEN = data.refresh_token;
    process.env.ACCESS_TOKEN = data.access_token;
    writeFileSync("data.json", JSON.stringify(dataJson), "utf8");
  }
}
// Refresh tokens are one-time use.
const getAccessToken = async (refresh_token: string) => {
  const payload = {
    grant_type: "refresh_token",
    refresh_token: refresh_token,
    scope: "internal",
    client_id: process.env.CLIENT_ID,
    expires_in: 734000,
    device_token: process.env.DEVICE_TOKEN,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  const response = await fetch(AUTH_URL, options);
  const data = await response.json();
  const dataJson = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };
  writeFileSync("data.json", JSON.stringify(dataJson), "utf8");
  process.env.ACCESS_TOKEN = data.access_token;
  return data.access_token;
};
