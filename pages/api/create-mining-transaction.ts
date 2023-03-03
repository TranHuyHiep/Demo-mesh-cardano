import type { NextApiRequest, NextApiResponse } from "next";
import {
  AppWallet,
  ForgeScript,
  Transaction,
  KoiosProvider,
  largestFirst,
} from "@meshsdk/core";
import type { Mint } from "@meshsdk/core";
import { demoMnemonic } from "../../config/wallet";
import {
  assetsMetadata,
  bankWalletAddress,
  costLovelace,
} from "../../config/mint";
import { receiveMessageOnPort } from "worker_threads";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const recipientAddress = "addr_test1qqpfz2zffg0ja48swnpc04jcdav6sthqzmxuwr2cakclufcvcgtxhvd62pjwh5j7rwet3mpx577u2yhth36nck9e49nsmh8d7h"
  const recipientAddress = req.body.recipientAddress;
  const utxos = req.body.utxos;
  console.log(recipientAddress)

  const blockchainProvider = new KoiosProvider("preview");
  const appWallet = req.body.wallet;

  const appWalletAddress = bankWalletAddress;
  const forgingScript = ForgeScript.withOneSignature(appWalletAddress);

  /**
   * TODO: Here you want to select one of your NFT that has not been minted
   */

  const assetIdPrefix = "test NFT";
  // In this starter template, we simply randomly pick one from.
  // let selectedAssetId = Math.floor(Math.random() * 10).toString();
  let selectedAssetId = "0";

  const assetMetadata = assetsMetadata[selectedAssetId];
  const assetName = `${assetIdPrefix}${selectedAssetId}`;

  const asset: Mint = {
    assetName: assetName,
    assetQuantity: "1",
    metadata: assetMetadata,
    label: "721",
    recipient: {
      address: recipientAddress,
    },
  };

  const selectedUtxos = largestFirst(costLovelace, utxos, true);

  const tx = new Transaction({ initiator: appWallet });
  tx.setTxInputs(selectedUtxos);
  tx.mintAsset(forgingScript, asset);
  tx.setChangeAddress(bankWalletAddress);

  const unsignedTx = await tx.build();

  const originalMetadata = Transaction.readMetadata(unsignedTx);

  /**
   * TODO: Here you want to save the `originalMetadata` in a database with the `assetName`
   */

  const maskedTx = Transaction.maskMetadata(unsignedTx);

  // In this starter template, we send `originalMetadata` to the frontend.
  // Not recommended, its better to save the `originalMetadata` in a database.
  res.status(200).json({ assetName, maskedTx, originalMetadata });
}
