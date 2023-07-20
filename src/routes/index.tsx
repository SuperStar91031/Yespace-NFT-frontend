import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';

export default function AppRoutes() {
  return useRoutes([MainRoutes]);
}
