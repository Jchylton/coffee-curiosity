import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LandingPage = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/HomePage");
    }
  }, [isAuthenticated]);
  return (
    <Page>
      <div>LandingPage</div>;
    </Page>
  );
};

export default LandingPage;

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-image: url("/Assets/Coffee.jpg");
`;
