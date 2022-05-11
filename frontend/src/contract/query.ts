import { LCDClient } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contractAddress } from "./address";

interface Response {
  posts: Array<IPost>;
}

export function getPosts(wallet: ConnectedWallet): Promise<Response> {
  const lcd = new LCDClient({
    URL: wallet.network.lcd,
    chainID: wallet.network.chainID,
  });

  return lcd.wasm.contractQuery(contractAddress(wallet), { get_posts: {} });
}
