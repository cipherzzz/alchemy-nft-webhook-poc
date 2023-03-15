// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
import { Alchemy, Network } from "alchemy-sdk";

let alchemy: Alchemy;
export const getAlchemy = () => {
  if (alchemy) {
    return alchemy;
  }

  const settings = {
    apiKey: process.env.API_KEY,
    authToken: process.env.AUTH_TOKEN,
    network: Network.MATIC_MUMBAI, // Replace with your network.
  };

  alchemy = new Alchemy(settings);
  return alchemy;
};
