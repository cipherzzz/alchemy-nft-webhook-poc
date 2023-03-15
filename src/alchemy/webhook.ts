import { Network, NftActivityWebhook, WebhookType } from "alchemy-sdk";
import { getAlchemy } from "./alchemy";

const createWebhook = async (params: {
  url: string;
  contractAddress: string;
  tokenId?: string;
}): Promise<NftActivityWebhook> => {
  const alchemy = getAlchemy();
  const nftActivityWebhook = await alchemy.notify.createWebhook(
    params.url,
    WebhookType.NFT_ACTIVITY,
    {
      filters: [
        {
          contractAddress: params.contractAddress,
          tokenId: params.tokenId,
        },
      ],
      network: Network.MATIC_MUMBAI,
    }
  );

  if (nftActivityWebhook && nftActivityWebhook.isActive) {
    console.log(`Created active webhook: ${nftActivityWebhook.id}`);
  }

  return nftActivityWebhook;
};

export const deleteWebhook = async (webhook: NftActivityWebhook) => {
  const alchemy = getAlchemy();
  await alchemy.notify.deleteWebhook(webhook);

  console.log(`Deleted webhook: ${webhook.id}`);
};

export const createWebhookForNFT = async (params: {
  contractAddress: string;
  tokenId: string;
}): Promise<NftActivityWebhook> => {
  const REMOTE_HOST = process.env.REMOTE_HOST ? process.env.REMOTE_HOST : "";
  const WEBHOOK_CONTEXT = process.env.WEBHOOK_CONTEXT
    ? process.env.WEBHOOK_CONTEXT
    : "";
  return await createWebhook({
    url: `${REMOTE_HOST}/${WEBHOOK_CONTEXT}`,
    contractAddress: params.contractAddress,
    tokenId: params.tokenId,
  });
};
