import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";

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
    <Page>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Enter User Recommendation</Title>
        <Label>
          Rating:
          <Input1
            type="number"
            min="1"
            max="5"
            name="rating"
            value={formData?.rating}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Recommendation:
          <Input2
            name="recommendation"
            value={formData?.recommendation}
            onChange={handleChange}
            required
          />
        </Label>
        <Submit type="submit" onClick={handleSubmit}>
          Save Recommendation
        </Submit>
      </StyledForm>
    </Page>
  );
};

export default RecommendationPage;

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-image: url("/Assets/Coffee.jpg");
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3d1e1e;
  font-family: helvetica;
`;

const StyledForm = styled.form`
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

const Input1 = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.75rem;
  color: #3d1e1e;
  font-family: helvetica;
  border: 1px solid #3d1e1e;
  border-radius: 5px;
`;

const Input2 = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.75rem;
  color: #3d1e1e;
  font-family: helvetica;
  border: 1px solid #3d1e1e;
  border-radius: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  font-family: helvetica;
`;

const Submit = styled.button`
  background-color: #3d1e1e;
  color: #fff3d9;
  font-size: 40px
  border: none;
  margin-top: 5px;
  border-radius: 5px;
  padding: 10px;
`;
