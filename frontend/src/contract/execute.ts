import { LCDClient, MsgExecuteContract, Fee } from "@terra-money/terra.js";
import { contractAddress } from "./address";
import { ConnectedWallet } from "@terra-money/wallet-provider";

// ==== utils ====

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const until = Date.now() + 1000 * 60 * 60;
const untilInterval = Date.now() + 1000 * 60;

const _exec =
  (msg: object, fee = new Fee(200000, { uluna: 10000 })) =>
  async (wallet: ConnectedWallet) => {
    const lcd = new LCDClient({
      URL: wallet.network.lcd,
      chainID: wallet.network.chainID,
    });

    const { result } = await wallet.post({
      fee,
      msgs: [
        new MsgExecuteContract(
          wallet.walletAddress,
          contractAddress(wallet),
          msg
        ),
      ],
    });

    while (true) {
      try {
        return await lcd.tx.txInfo(result.txhash);
      } catch (e) {
        if (Date.now() < untilInterval) {
          await sleep(500);
        } else if (Date.now() < until) {
          await sleep(1000 * 10);
        } else {
          throw new Error(
            `Transaction queued. To verify the status, please check the transaction hash: ${result.txhash}`
          );
        }
      }
    }
  };

// ==== execute contract ====

export const createPost = (
  wallet: ConnectedWallet,
  title: string,
  description: string,
  image: string
) => _exec({ create_post: { title, description, image } })(wallet);

export const likePost = (wallet: ConnectedWallet, index: number) =>
  _exec({ like_post: { index } })(wallet);
