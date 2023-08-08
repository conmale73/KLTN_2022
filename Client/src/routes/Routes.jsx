import { useRoutes } from "react-router-dom";
import { DefaultLayout } from "../components/Layout";
import NotFound from "../pages/NotFound";
import { publishRoutes } from "./PublishRoutes";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home/Home";
export default function Routes() {
    const routes = [
        {
            path: "/",
            element: <DefaultLayout />,
            children: [
                ...publishRoutes,
                { path: "/music/", element: <Home title="MY SPACE" /> },
                { path: "*", element: <NotFound title="Not found" /> },
            ],
        },
    ];
    return useRoutes(routes);
}
