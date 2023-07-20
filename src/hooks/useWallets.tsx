import { useContext } from 'react';
import WalletsContext from 'contexts/WalletsContext';

const useWallets = () => {
  const context = useContext(WalletsContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
};

export default useWallets;
