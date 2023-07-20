import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider, JsonRpcFetchFunc } from '@ethersproject/providers';

export const getLibrary = (provider: JsonRpcFetchFunc) => {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
};

export const injected = new InjectedConnector({
  supportedChainIds: [1]
});
