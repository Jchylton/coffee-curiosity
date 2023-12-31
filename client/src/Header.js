import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to="/">
          <LogoImg src="/Assets/Icon_Only.png" atl="logo" />
        </Link>
      </LogoContainer>
      <Title>COFFEE CURIOSITY</Title>
      {!isAuthenticated ? (
        <LoginIcon
          src="/Assets/Login.png"
          atl="logo"
          onClick={() => loginWithRedirect()}
        />
      ) : (
        <></>
      )}
      {isAuthenticated && (
        <Link to="/ProfilePage/:user">
          <LoginIcon src="/Assets/Login.png" atl="logo" />
        </Link>
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 5px; */
  background-color: #fff3d9;
  min-width: 100vw;
`;
const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #3d1e1e;
  font-family: helvetica;
`;

const LogoContainer = styled.div`
  max-width: 100px;
`;
const LogoImg = styled.img`
  max-width: 100%;
  height: auto;
`;

const LoginIcon = styled.img`
  width: 65px;
  height: 65px;
  padding-right: 10px;
`;

// const Navigation = styled.nav`
//   ul {
//     list-style: none;
//     display: flex;
//     margin: 0;
//     padding: 0;
//   }

//   li {
//     margin-right: 40px;
//   }

//   a {
//     text-decoration: none;
//     color: #333;
//     font-weight: normal;
//     font-size: 20px;
//   }
// `;
// const CartIcon = styled.div`
//   font-size: 30px;
//   cursor: pointer;
// `;
