import { login } from "./auth.js";
import { order } from "./order.js";

const arg = process.argv[2];

if (!arg) {
  console.error("Please provide a Stock Symbol!");
  process.exit(1);
}
const accounts = process.env.ACCOUNTS?.split(",") || [];
async function main() {
  console.log("Starting the process...");
  await login();
  // Sequentially process each account
  for (const account of accounts) {
    try {
      console.log(`Placing order for account: ${account}`);
      await order(arg, Number(account));
      console.log(`Done processing account: ${account}`);
    } catch (error) {
      console.error(`Error processing account ${account}:`, error);
    }
  }

  console.log("All accounts processed!");
}

main().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
