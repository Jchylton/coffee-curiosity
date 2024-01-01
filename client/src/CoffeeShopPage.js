import React from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
    <>
      <div>
        <h1>{coffeeShop?.properties.name}</h1>
        <h1>{coffeeShop?.properties.address_line2}</h1>
        <h1>{coffeeShop?.properties.datasource.raw.website}</h1>
        <h1>{coffeeShop?.properties.datasource.raw.amenity}</h1>
      </div>
      <button
        onClick={() => {
          navigate(`/RecommendationPage/${coffeeShop?.properties.place_id}`);
        }}
      >
        Add Recommendation
      </button>
      <div>
        {isAuthenticated &&
          recommendation?.map((rec) => {
            return (
              <>
                <div>{rec.name}</div>
                <div>{rec.rating}</div>
                <div>{rec.recommendation}</div>
                <button
                  disabled={user.email !== rec._id}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete Recommendation
                </button>
              </>
            );
          })}
      </div>
    </>
  );
};

export default CoffeeShopPage;
