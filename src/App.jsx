import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/app-layout";
import Landing from "./pages/landing-page";
import Dashboard from "./pages/dashboard";
import Link from "./pages/link";
import RedirectLink from "./pages/redirect-link";
import Auth from "./pages/auth";
import UrlProvider from "./context";
import RequireAuth from "./components/require-auth";

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
          element: (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          ),
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/link/:id",
          element: (
            <RequireAuth>
              <Link />
            </RequireAuth>
          ),
        },
        {
          path: "/:id",
          element: <RedirectLink />,
        },
      ],
    },
  ]);
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
