import { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setisLoading(true);
      authService
        .verify(token)
        .then(({ data }) => {
          setUser(data);
          setisLoading(false);
        })
        .catch((err) => {
          logoutUser();
        });
    } else {
      logoutUser();
    }
  };

  const logoutUser = () => {
    setUser(null);
    setisLoading(false);
    localStorage.removeItem("authToken");
  };

  const refreshToken = () => {
    authService
      .refreshToken()
      .then(({ data }) => {
        storeToken(data.authToken);
        authenticateUser();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        authenticateUser,
        user,
        logoutUser,
        isLoading,
        refreshToken,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
