import { useRoutes } from 'react-router-dom';
import routes from './routes';

export default function AppRouter() {
  const routesList = [];

  Object.values(routes).forEach((group) => {
    routesList.push(...group);
  });

  return useRoutes(routesList);
}
