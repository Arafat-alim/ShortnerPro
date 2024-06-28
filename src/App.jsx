import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/app-layout";
import Landing from "./pages/landing-page";
import Dashboard from "./pages/dashboard";
import Link from "./pages/link";
import RedirectLink from "./pages/redirect-link";
import Auth from "./pages/auth";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/link/:id",
          element: <Link />,
        },
        {
          path: "/:id",
          element: <RedirectLink />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
