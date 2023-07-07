import { lazy, Suspense } from "react";
import Loading from "~/components/Loading";
const Home = lazy(() => import("../pages/Home"));
const History = lazy(() => import("../pages/History"));

export const publishRoutes = [
    {
        index: true,
        element: (
            <Suspense fallback={<Loading />}>
                <Home title="MY SPACE" />
            </Suspense>
        ),
    },
    {
        path: "/history",
        element: (
            <Suspense fallback={<Loading />}>
                <History title="HISTORY" />
            </Suspense>
        ),
    },
];
