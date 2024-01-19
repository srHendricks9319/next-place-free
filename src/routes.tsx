import Home from "./views/home.view";
import NotFound from "./views/notFound.view";
import Search from "./views/search.view";
import Settings from "./views/settings.view";

export const routes = [
  { path: "", element: <Home /> },
  { path: "/search", element: <Search /> },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
