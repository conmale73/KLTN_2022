import { useRoutes } from 'react-router-dom';
import { DefaultLayout } from '../components/Layout';
import NotFound from '../pages/NotFound';
import { publishRoutes } from './PublishRoutes';
import { Outlet } from 'react-router-dom';
export default function Routes() {
    const routes = [
        {
            path: '/',
            element: <DefaultLayout />,
            children: [
                ...publishRoutes,
                { path: '*', element: <NotFound title="Not found" /> },
            ],
        },
    ];
    return useRoutes(routes);
}
