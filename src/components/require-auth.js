import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

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

  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth");
  }, [isAuthenticated, loading]);

  if (!loading) return <BarLoader width="100%" color="#36d7b7" />;
  if (isAuthenticated) return children;
};

export default RequireAuth;
