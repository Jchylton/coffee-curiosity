import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LandingPage = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
      fetch("/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user.email,
          name: user.name,
          Email: user.email,
          memberSince: user.updated_at.slice(0, 11),
          Recommendations: [],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/HomePage");
          console.log(data);
        })
        .catch((error) => {
          window.alert(error);
        });
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
