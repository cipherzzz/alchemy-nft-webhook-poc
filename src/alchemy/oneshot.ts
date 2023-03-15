import { getAlchemy } from "./alchemy";

export const checkAddressOwnsNFT = async (params: {
  walletAddress: string;
  contractAddress: string;
  tokenId: string;
}): Promise<boolean> => {
  const alchemy = getAlchemy();
  const result = await alchemy.nft.getOwnersForNft(
    params.contractAddress,
    params.tokenId
  );
  if (result && result.owners && result.owners.length === 1) {
    return (
      params.walletAddress.toLowerCase() === result.owners[0].toLowerCase()
    );
  }
  return false;
};
