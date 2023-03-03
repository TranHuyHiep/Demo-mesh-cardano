import type { AssetMetadata } from "@meshsdk/core";

export const costLovelace = "1000000";

export const bankWalletAddress = `addr_test1qqajhwedue0dakcm7eavml7xtfdf95q7vueqldh7ettvf2999pv4f35ds46dfuzeqcump83kh6l8dqjgcu6gq4jalx6qarqhy2`;

export const assetsMetadata: { [id: string]: AssetMetadata } = {
  "0": {
    name: "UTC's cert",
    image: "ipfs://QmQes53Jke7GWotQNo5MCjY5Jway8zX8dLAWueN9nkzBSc",
    mediaType: "image/jpg",
    description: "This NFT is minted by Mesh (https://meshjs.dev/).",
  },
};
