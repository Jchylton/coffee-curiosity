import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  return (
    <>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Sign In</button>
      ) : (
        <button onClick={() => logout()}>Sign Out</button>
      )}
    </>
  );
};

export default Header;
