import { lazy, Suspense } from 'react';
import Loading from '~/components/Loading';
const Home = lazy(() => import('../pages/Home'));

export const publishRoutes = [
    {
        index: true,
        element: (
            <Suspense fallback={<Loading />}>
                <Home title="MY SPACE" />
            </Suspense>
        ),
    },
];