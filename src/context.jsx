import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, loading, fetchUser, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

//! to access the data, user required useContext hook from react.
export const urlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
