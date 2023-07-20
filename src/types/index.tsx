import { ReactElement } from "react";

export enum WalletTypeProps {
  Ethereum = "ethereum",
  Solana = "solana",
  MyAlgo = "myalgo",
}

export type UpdateWalletProps = {
  address: string;
  type: string;
  connected: boolean;
};

export type GuardProps = {
  children: ReactElement | null;
};

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export type AddressProps = {
  address: string;
  type: string;
  nonce?: number;
  signature?: string | Uint8Array;
};

export type IAddress = {
  type: string;
  address: string;
};

export type NetworkType = {
  name: string;
  icon: string;
};

export type INFT = {
  _id?: string;
  name?: string;
  description?: string;
  image?: string;
  video?: string;
  isShow?: boolean;
  network?: NetworkType;
};

export type Holder = {
  _id?: string;
  addresses?: number;
  nftLength: number;
  name?: string;
  bio?: string;
  avatar?: string;
  nonce?: string;
  status?: string;
  nfts?: INFT[];
};

export type IUser = {
  _id?: string;
  name?: string;
  bio?: string;
  avatar?: string;
  addresses?: IAddress[];
  isCreated?: boolean;
  statue?: boolean;
};

export type WalletsContextType = {
  type: string;
  address: string;
  isLoggedIn: boolean;
  connectedPhantom: boolean;
  connectedMetamask: boolean;
  connectedMyAlgo: boolean;
  connectPhantom: (status?: boolean) => void;
  connectMetamask: (status?: boolean) => void;
  connectMyAlgo: (status?: boolean) => void;
  disconnectPhantom: (status?: boolean) => void;
  disconnectMetamask: (status?: boolean) => void;
  disconnectMyAlgo: (status?: boolean) => void;
  disconnectWallets: () => void;
};

export type ApiContextType = {
  checkAddress: (account: AddressProps) => Promise<any>;
  signUpAddress: (account: AddressProps) => Promise<any>;
  signInAddress: (account: AddressProps) => Promise<any>;
  updateAccount: (account: any) => Promise<any>;
  updateWallet: (address: UpdateWalletProps) => Promise<any>;
  getMyNFTs: (isShow: boolean) => Promise<any>;
  getMyWalletNFTs: () => Promise<any>;
  getCollections: (id: string) => Promise<any>;
  getExploreData: () => Promise<any>;
  setShowNFT: (nfts: any) => Promise<any>;
};
