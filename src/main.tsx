import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import RootLayout from "./layout";
import routes from "./routes";
import ErrorView from "./views/error.view";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorView />,
    // specify the routes defined in the
    // routing layer directly
    children: routes,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
