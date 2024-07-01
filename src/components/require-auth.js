import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 *
 * login
 * 1. if user is not authenticated and laoding is false then move the user to the auth page (check this in useEffect with update phase )
 * 2. If loading is true, then show the BarLoader with full width
 * 3. If user is authenticated then move the user to the provided children component.
 */

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  console.log("isAuthenticated___", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth");
  }, [isAuthenticated, loading]);

  if (loading) {
    return "Loading...";
  }

  if (isAuthenticated) return children;
};

export default RequireAuth;
