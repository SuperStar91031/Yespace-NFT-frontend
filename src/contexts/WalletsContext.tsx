import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "store";
import {
  Login,
  Logout,
  SetAddressType,
  SetUserData,
} from "store/reducers/auth";
import { IAddress, WalletsContextType, WalletTypeProps } from "types";
import { injected } from "utils/metamask";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";
import Web3 from "web3";
import bs58 from "bs58";
import MyAlgoWallet, { SignedTx } from '@randlabs/myalgo-connect';
import algosdk from 'algosdk';

import { useNavigate } from "react-router-dom";
import useApi from "hooks/userApi";

const WalletsContext = createContext<WalletsContextType | null>(null);
interface AddressProps {
  address: string;
  type: string;
  nonce?: number;
  signature?: string | Uint8Array;
}

const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');

export const WalletsProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myAlgoWallet = new MyAlgoWallet();
  const phantom = useWallet();
  const { signInAddress, signUpAddress, checkAddress, updateWallet } = useApi();
  const { user, type, isLoggedIn } = useSelector((state) => state.auth);
  const { account, activate, active, deactivate, library } = useWeb3React();
  const [myAlgoWallets, setMyAlgoWallets] = useState<string>();
  const [selectedMyAlgoWallet, setSelectedMyAlgoWallet] = useState<string>();
  const connectedMetamask = active;
  const connectedPhantom = phantom.connected;
  const connectedMyAlgo = myAlgoWallets ? true : false;
  const [count, setCount] = useState(0);

  const [myAlgoBalance, setMyAlgoBalance] = useState<number>();

  const address = String(phantom?.publicKey?.toBase58() || account || myAlgoWallets);

  const connectPhantom = (status: boolean = false) => {
    if (!phantom) {
      // return window.open("https://phantom.app", "_blank");
    } else {
      phantom.select(PhantomWalletName);
      phantom
        .connect()
        .finally(() => {
          if (!isLoggedIn) dispatch(SetAddressType(WalletTypeProps.Solana));
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  const disconnectPhantom = (status: boolean = false) => {
    phantom.disconnect();
    const solana = user.addresses?.find(
      (e: IAddress) => e.type === WalletTypeProps.Solana
    );
    if (status && solana?.address) {
      updateWallet({
        address: solana.address,
        type: WalletTypeProps.Solana,
        connected: false,
      }).then(({ data }) => {
        if (data.addresses)
          dispatch(SetUserData({ addresses: data.addresses }));
      });
    }
  };

  const connectMetamask = (status: boolean = false) => {
    if ((window as any)?.ethereum === undefined) {
      return window.open("https://metamask.io", "_blank");
    } else {
      activate(injected, undefined, true)
        .finally(() => {
          if (!isLoggedIn) dispatch(SetAddressType(WalletTypeProps.Ethereum));
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(injected);
          }
        });
    }
  };

  const disconnectMetamask = (status: boolean = false) => {
    deactivate();
    const ethereum = user.addresses?.find(
      (e: IAddress) => e.type === WalletTypeProps.Ethereum
    );
    if (status && ethereum?.address) {
      updateWallet({
        address: ethereum.address,
        type: WalletTypeProps.Ethereum,
        connected: false,
      }).then(({ data }) => {
        if (data.addresses)
          dispatch(SetUserData({ addresses: data.addresses }));
      });
    }
  };

  const connectMyAlgo = async (status: boolean = false) => {
    try {
      const accounts = await myAlgoWallet.connect();
      const _wallets: any = accounts.map(account => account.address);
      setMyAlgoWallets(_wallets[0]);
      setSelectedMyAlgoWallet(_wallets[0]);
      if (!isLoggedIn) dispatch(SetAddressType(WalletTypeProps.MyAlgo));
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectMyAlgo = (status: boolean = false) => {
    setMyAlgoWallets("");
    setSelectedMyAlgoWallet("");
    const myalgo = user.addresses?.find(
      (e: IAddress) => e.type === WalletTypeProps.MyAlgo
    );
    if (status && myalgo?.address) {
      updateWallet({
        address: myalgo.address,
        type: WalletTypeProps.MyAlgo,
        connected: false,
      }).then(({ data }) => {
        if (data.addresses)
          dispatch(SetUserData({ addresses: data.addresses }));
      });
    }
  };

  const disconnectWallets = () => {
    disconnectPhantom();
    disconnectMetamask();
    disconnectMyAlgo();
    dispatch(Logout({}));
  };

  const handleAuthenticate = (account: AddressProps) => {
    signInAddress(account)
      .then(({ data }) => {
        dispatch(Login(data));
      })
      .catch((error) => { });
  };

  const handleSignMessage = async (account: AddressProps) => {
    try {
      if (account.type === WalletTypeProps.Ethereum) {
        const web3 = new Web3(library.provider);
        const signature = await web3.eth.personal.sign(
          `yenft: ${account.nonce}`,
          address,
          ""
        );
        handleAuthenticate({ ...account, signature });
      } else if (phantom.signMessage && account.type === WalletTypeProps.Solana) {
        const encodedMessage = new TextEncoder().encode(
          `yenft: ${account.nonce}`
        );
        const signature = await phantom.signMessage(encodedMessage);
        handleAuthenticate({ ...account, signature: bs58.encode(signature) });
      } else if (account.type === WalletTypeProps.MyAlgo) {
        // const encodedMessage = new TextEncoder().encode(
        //   `yenft: ${account.nonce}`
        // );
        // const signature = await myAlgoWallet.signMessage(encodedMessage);
        handleAuthenticate({ ...account, signature: "" });
      }
    } catch (error) { }
  };

  const handleSignup = (account: AddressProps) => {
    signUpAddress(account)
      .then(({ data }: any) => {
        handleSignMessage(data);
      })
      .catch((error) => { });
  };

  const signinWallet = async (account: AddressProps) => {
    checkAddress(account)
      .then(({ data }: any) => {
        if (data.status) {
          handleSignMessage(data);
        } else {
          handleSignup(account);
        }
      })
      .catch((error) => { });
  };
  useEffect(() => {
    if (!isLoggedIn) {
      if (account) {
        signinWallet({ address: account, type: WalletTypeProps.Ethereum });
      } else if (phantom.publicKey) {
        signinWallet({ address: phantom.publicKey.toBase58(), type: WalletTypeProps.Solana });
      } else if (myAlgoWallets) {
        signinWallet({ address: myAlgoWallets, type: WalletTypeProps.MyAlgo });
      }
    }
  }, [isLoggedIn, account, phantom.publicKey, myAlgoWallets]);

  useEffect(() => {
    if (isLoggedIn && count && account) {
      updateWallet({
        address: account,
        type: WalletTypeProps.Ethereum,
        connected: true,
      }).then(({ data }) => {
        if (data.addresses)
          dispatch(SetUserData({ addresses: data.addresses }));
      });
    }
  }, [account]);

  useEffect(() => {
    if (isLoggedIn && count && phantom.publicKey) {
      updateWallet({
        address: phantom.publicKey.toBase58(),
        type: WalletTypeProps.Solana,
        connected: true,
      }).then(({ data }) => {
        if (data.addresses)
          dispatch(SetUserData({ addresses: data.addresses }));
      });
    }
  }, [phantom.publicKey]);

  useEffect(() => {
    if (isLoggedIn && count && myAlgoWallets) {
      updateWallet({
        address: myAlgoWallets,
        type: WalletTypeProps.MyAlgo,
        connected: true,
      }).then(({ data }) => {
        if (data.addresses)
          dispatch(SetUserData({ addresses: data.addresses }));
      });
    }
  }, [myAlgoWallets]);

  useEffect(() => {
    (async () => {
      if (user?.addresses) {
        const isEthereum = user.addresses.find(
          (e: IAddress) => e.type === WalletTypeProps.Ethereum
        );
        const isSolana = user.addresses.find(
          (e: IAddress) => e.type === WalletTypeProps.Solana
        );
        const isMyAlgo = user.addresses.find(
          (e: IAddress) => e.type === WalletTypeProps.MyAlgo
        );
        if (isEthereum) connectMetamask();
        if (isSolana) setTimeout(connectPhantom, 100);
        if (isMyAlgo) setTimeout(connectMyAlgo, 200);
      }
      setCount(1);
    })();
  }, []);


  useEffect(() => {
    (async () => {

      if (!selectedMyAlgoWallet) return;
      let accountInfo = await algodClient.accountInformation(selectedMyAlgoWallet).do();

      const _balance = accountInfo.amount;
      setMyAlgoBalance(_balance);

    })();
  }, [selectedMyAlgoWallet]);

  return (
    <WalletsContext.Provider
      value={{
        type,
        address,
        isLoggedIn,
        connectedMetamask,
        connectedPhantom,
        connectedMyAlgo,
        connectPhantom,
        connectMetamask,
        connectMyAlgo,
        disconnectPhantom,
        disconnectMetamask,
        disconnectMyAlgo,
        disconnectWallets,
      }}
    >
      {children}
    </WalletsContext.Provider>
  );
};

export default WalletsContext;
