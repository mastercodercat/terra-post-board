import React from "react";
import Button from "@mui/material/Button";

import { useWallet, WalletStatus } from "@terra-dev/use-wallet";

const ConnectWallet = () => {
  const {
    status,
    availableConnectTypes,
    availableInstallTypes,
    connect,
    install,
    disconnect,
  } = useWallet();

  return (
    <div>
      {status === WalletStatus.WALLET_NOT_CONNECTED && (
        <>
          {availableInstallTypes.map((connectType) => (
            <Button
              variant="contained"
              key={`install-${connectType}`}
              onClick={() => install(connectType)}
            >
              Install {connectType}
            </Button>
          ))}
          {availableConnectTypes.map((connectType) => (
            <Button
              variant="text"
              key={`connect-${connectType}`}
              onClick={() => connect(connectType)}
            >
              Connect {connectType}
            </Button>
          ))}
        </>
      )}
      {status === WalletStatus.WALLET_CONNECTED && (
        <Button variant="contained" onClick={() => disconnect()}>
          Disconnect
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
