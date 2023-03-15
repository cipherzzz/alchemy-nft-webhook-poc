import { createWebhookForNFT, checkAddressOwnsNFT } from "./alchemy";
import { startListener } from "./listener";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Contract address and tokenID to track
  // We will tweak to follow multiple tokens and potentially multiple contracts if needed
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    ? process.env.CONTRACT_ADDRESS
    : "";
  const TOKEN_ID = process.env.TOKEN_ID ? process.env.TOKEN_ID : "";
  const WALLET_ADDRESS = process.env.WALLET_ADDRESS
    ? process.env.WALLET_ADDRESS
    : "";

  // STEP 1 - Do an initial check to see if nft is owned by address in question
  const isOwned = await checkAddressOwnsNFT({
    walletAddress: WALLET_ADDRESS,
    contractAddress: CONTRACT_ADDRESS,
    tokenId: TOKEN_ID,
  });

  if (isOwned) {
    // STEP 2 - Create a webhook to listen to changes on the contract and token
    const webhook = await createWebhookForNFT({
      contractAddress: CONTRACT_ADDRESS,
      tokenId: TOKEN_ID,
    });

    // This is just a local webserver to receive events from the webhook
    // Note that each webhook has a signing key to verify the origin of the webhook
    startListener(webhook.signingKey);
  } else {
    console.log(
      `Address: ${WALLET_ADDRESS} does not own token: ${TOKEN_ID} on contract: ${CONTRACT_ADDRESS}`
    );
  }
}

main();
