import React from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const TOKEN2 = "bad348c5308142d4b04a8abeae954d98";

const CoffeeShopPage = ({ coffeeShops }) => {
  console.log(coffeeShops);
  const navigate = useNavigate();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { coffee } = useParams();
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [recommendation, setRecommendation] = useState([]);
  useEffect(() => {
    setCoffeeShop(() => {
      return coffeeShops.find((c) => {
        return c.properties.place_id == coffee;
      });
    });
  }, [coffeeShops]);
  const loadRecommendations = () => {
    if (coffeeShop)
      fetch(`/getRecommendation/${coffeeShop?.properties.place_id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRecommendation(data.data);
        });
  };
  useEffect(() => {
    loadRecommendations();
  }, [coffeeShop]);
  const handleDelete = () => {
    fetch(`/deleterecommendation/${user.email}/${coffee}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        loadRecommendations();
      })
      .catch((error) => {
        window.alert(error);
      });
  };
  console.log(coffeeShop);
  console.log(coffee);
  console.log(recommendation);
  return (
    <Page>
      <Info>
        <div>
          <Intro>Coffee Shop Information</Intro>
          <h2>Name: {coffeeShop?.properties.name}</h2>
          <h2>Address: {coffeeShop?.properties.address_line2}</h2>
          <h2>Website: {coffeeShop?.properties.datasource.raw.website}</h2>
        </div>
        <Submit
          onClick={() => {
            navigate(`/RecommendationPage/${coffeeShop?.properties.place_id}`);
          }}
        >
          Add Recommendation
        </Submit>
      </Info>
      <Info>
        {isAuthenticated &&
          recommendation?.map((rec) => {
            return (
              <>
                {/* <Intro2>User Recommendation</Intro2> */}
                <div>Username: {rec.name}</div>
                <div>Rating: {rec.rating}</div>
                <div>Comment: {rec.recommendation}</div>
                <Delete
                  disabled={user.email !== rec._id}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete Recommendation
                </Delete>
              </>
            );
          })}
      </Info>
    </Page>
  );
};

export default CoffeeShopPage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-size: cover;
  background-image: url("/Assets/Coffee.jpg");
`;

const Info = styled.div`
  margin-top: 24px;
  background-color: #fff3d9;
  border: 2px solid #3d1e1e;
  border-radius: 10px;
  padding: 50px;
  margin: auto 0px auto;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  color: #3d1e1e;
  font-family: helvetica;
  box-sizing: border-box;
  /* padding: 2rem; */
  display: grid;
  gap: 1rem;
`;

const Intro = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3d1e1e;
  font-family: helvetica;
  padding-bottom: 30px;
`;

const Submit = styled.button`
  background-color: #99f2ae;
  color: #3d1e1e;
  font-size: 40px
  margin-top: 5px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Delete = styled.button`
  background-color: #e8776f;
  color:#3d1e1e;
  font-size: 40px
  margin-top: 5px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Intro2 = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3d1e1e;
  font-family: helvetica;
  padding-bottom: 10px;
`;
