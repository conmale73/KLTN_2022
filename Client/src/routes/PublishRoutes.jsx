import { lazy, Suspense } from "react";
import Loading from "~/components/Loading";
const Home = lazy(() => import("../pages/Home"));
const History = lazy(() => import("../pages/History"));
const Library = lazy(() => import("../pages/Library"));
const LibraryPlaylist = lazy(() => import("../pages/LibraryPlaylist"));
const Leaderboard = lazy(() => import("../pages/Leaderboard"));
const SearchResult = lazy(() => import("../pages/SearchResult"));
const AuthenticationPage = lazy(() => import("../pages/AuthenticationPage"));
const SongDetail = lazy(() => import("../pages/SongDetail"));
const PlaylistDetail = lazy(() => import("../pages/PlaylistDetail"));
const ArtistDetail = lazy(() => import("../pages/ArtistDetail"));
const Profile = lazy(() => import("../pages/Profile"));
export const publishRoutes = [
    {
        index: true,
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Home title="MY SPACE" />
            </Suspense>
        ),
    },
    {
        path: "/authentication/:type",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <AuthenticationPage />
            </Suspense>
        ),
    },
    {
        path: "/profile",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Profile title="Profile" />
            </Suspense>
        ),
    },
    {
        path: "/music/home",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Home title="MY SPACE" />
            </Suspense>
        ),
    },
    {
        path: "/music/history",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <History title="Recently Songs/Playlists" />
            </Suspense>
        ),
    },
    {
        path: "/music/library",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Library title="Library" />
            </Suspense>
        ),
    },
    {
        path: "/music/library/playlists",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <LibraryPlaylist title="My Playlists" />
            </Suspense>
        ),
    },
    {
        path: "/music/leaderboard",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Leaderboard title="Top 100 songs" />
            </Suspense>
        ),
    },
    {
        path: "/music/search-results",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <SearchResult />
            </Suspense>
        ),
    },
    {
        path: "/music/songs/:id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <SongDetail />
            </Suspense>
        ),
    },
    {
        path: "/music/playlists/:id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <PlaylistDetail />
            </Suspense>
        ),
    },
    {
        path: "/music/users/:id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <ArtistDetail />
            </Suspense>
        ),
    },
];
