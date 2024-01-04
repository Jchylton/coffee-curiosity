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
          memberSince: user.updated_at.slice(0, 10),
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
      <Background>
        <Wrapper>
          <Bio>
            A community where coffee connoisseurs can locate, taste, and rate
            the exquisite experiences being offered by local coffee shops in
            your area. Community users will be able to log into the app and see
            where local shops exist in their area and also see what coffee shops
            other coffee connoisseurs have rated for their next visit!
          </Bio>
          <Tagline>FIND | CONNECT | ENJOY THE AROMA</Tagline>
        </Wrapper>
      </Background>
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
const Background = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-image: url("/Assets/Couple_Pic.jpg");
  width: 90vw;
  height: 90vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff3d9;
  color: #3d1e1e;
  font-family: helvetica;
  border: 2px solid #3d1e1e;
  border-radius: 15px;
  padding: 36px;
  width: 75%;
`;

const Bio = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const Tagline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px;
  font-size: 28px;
`;
