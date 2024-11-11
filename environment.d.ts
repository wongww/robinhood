declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USERNAME: string;
      PASSWORD: string;
      CLIENT_ID: string;
      AUTH_ENDPOINT: string;
      ACCESS_TOKEN: string;
      REFRESH_TOKEN: string;
      DEVICE_TOKEN: string;
      ACCOUNTS: string;
    }
  }
}

export {};
