import React, { createContext } from "react";
import axios from "utils/axios";
import { AddressProps, ApiContextType, UpdateWalletProps } from "types";

const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactElement }) => {
  const checkAddress = async (account: AddressProps) => {
    return await axios.post("auth/check", account);
  };

  const signUpAddress = async (account: AddressProps) => {
    return await axios.post("auth/signup", account);
  };

  const signInAddress = async (account: AddressProps) => {
    return await axios.post("auth/signin", account);
  };

  const updateAccount = async (account: AddressProps) => {
    return await axios.put("auth", account);
  };

  const updateWallet = async (address: UpdateWalletProps) => {
    await axios
      .put("auth/wallet", address)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const getMyWalletNFTs = async () => {
    return await axios.get("nft");
  };

  const getMyNFTs = async (isShow: boolean) => {
    return await axios.post("nft/mynft", { isShow });
  };

  const getCollections = async (id: string) => {
    return await axios.get(`nft/collections/${id}`);
  };

  const getExploreData = async () => {
    return await axios.get(`nft/explore`);
  };

  const setShowNFT = async (nfts: any) => {
    return await axios.post(`nft/setShowNFT`, nfts);
  };

  return (
    <ApiContext.Provider
      value={{
        checkAddress,
        signUpAddress,
        signInAddress,
        updateAccount,
        updateWallet,
        getMyNFTs,
        getMyWalletNFTs,
        getCollections,
        getExploreData,
        setShowNFT,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
