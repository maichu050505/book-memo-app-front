import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TopPage } from "./pages/TopPage";
import { LoginPage } from "./pages/LoginPage";
import { SigninPage } from "./pages/SigninPage";
import { Dashboard } from "./pages/Dashboard";
import { AddPage } from "./pages/AddPage";
import { EditPage } from "./pages/EditPage";
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
    path: "/add",
    element: <AddPage />,
  },
  {
    path: "/edit",
    element: <EditPage />,
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
