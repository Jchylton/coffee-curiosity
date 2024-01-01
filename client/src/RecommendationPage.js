import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const RecommendationPage = ({ coffeeShops }) => {
  const navigate = useNavigate();
  const { coffee } = useParams();
  const [coffeeShop, setCoffeeShop] = useState(null);
  useEffect(() => {
    setCoffeeShop(() => {
      return coffeeShops.find((c) => {
        return c.properties.place_id == coffee;
      });
    });
  }, [coffeeShops]);
  const [formData, setFormData] = useState({});
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    fetch(`/addrecommendation/${user.email}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        Name: coffeeShop?.properties.name,
        Address: coffeeShop?.properties.address_line2,
        Id: coffeeShop?.properties.place_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate(`/CoffeeShopPage/${coffee}`);
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData?.rating}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Recommendation:
          <textarea
            name="recommendation"
            value={formData?.recommendation}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Save Recommendation
        </button>
      </form>
    </div>
  );
};

export default RecommendationPage;

// const Submit = styled.button`
//   background-color: #d1560e;
//   border: none;
//   margin-top: 5px;
//   border-radius: 2px;

//   &:disabled{
//       color: var(--color-orange);
//   }
// `

// const StyledForm = styled.form`
//   margin-top: 24px;
//   border: 5px solid var(--color-alabama-crimson);
//   padding: 30px;
//   margin: auto 0px auto;
//   display: flex;
//   flex-direction: column;
//   margin-left: 50px;
// `
