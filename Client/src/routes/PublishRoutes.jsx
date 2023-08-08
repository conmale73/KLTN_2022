import { lazy, Suspense } from "react";
import Loading from "~/components/Loading";
const Home = lazy(() => import("../pages/Home"));
const History = lazy(() => import("../pages/History"));
const Library = lazy(() => import("../pages/Library"));
const LibraryPlaylist = lazy(() => import("../pages/LibraryPlaylist"));
const Leaderboard = lazy(() => import("../pages/Leaderboard"));

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
        path: "/music/home",
        element: (
            <Suspense fallback={<Loading />}>
                <Home title="MY SPACE" />
            </Suspense>
        ),
    },
    {
        path: "/music/history",
        element: (
            <Suspense fallback={<Loading />}>
                <History title="Recently Songs/Playlists" />
            </Suspense>
        ),
    },
    {
        path: "/music/library",
        element: (
            <Suspense fallback={<Loading />}>
                <Library title="Library" />
            </Suspense>
        ),
    },
    {
        path: "/music/library/playlists",
        element: (
            <Suspense fallback={<Loading />}>
                <LibraryPlaylist title="My Playlists" />
            </Suspense>
        ),
    },
    {
        path: "/music/leaderboard",
        element: (
            <Suspense fallback={<Loading />}>
                <Leaderboard title="Top 100 songs" />
            </Suspense>
        ),
    },
];
