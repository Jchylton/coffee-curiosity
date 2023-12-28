import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/HomePage");
    }
  }, [isAuthenticated]);
  return <div>LandingPage</div>;
};

export default LandingPage;
