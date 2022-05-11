// sync-ed from root via `tr sync-refs`
import { ConnectedWallet } from "@terra-money/wallet-provider";
import config from "../refs.terrain.json";
export const contractAddress = (wallet: ConnectedWallet) =>
  (config as any)[wallet.network.name].post_board.contractAddresses.default;
