import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TopPage } from "./pages/TopPage";
import { LoginPage } from "./pages/LoginPage";
import { SigninPage } from "./pages/SigninPage";
import { Dashboard } from "./pages/Dashboard";
import { Search } from "./pages/Search";
import { SinglePage } from "./pages/SinglePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TopPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/single",
    element: <SinglePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
