import { useContext } from 'react';
import ApiContext from 'contexts/ApiContext';

const useApi = () => {
  const context = useContext(ApiContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
};

export default useApi;
