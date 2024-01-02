import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Input } from "@mui/base";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
      fetch(`/getuser/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFormData(data.data);
        })
        .catch((error) => {
          window.alert(error);
        });
    }
  }, [isAuthenticated]);

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
    fetch(`/updateuser/${user.email}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/HomePage");
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  return (
    <Page>
      <StyledForm onSubmit={handleSubmit}>
        <Title>View/Edit Profile</Title>
        <Label>
          Username:
          <Input1
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleChange}
            required
          />
        </Label>
        <br />
        <Label>
          Email:
          <Input2 type="text" name="Email" value={formData?.Email} required />
        </Label>
        <br />
        <Label>
          Member Since:
          <Input3 name="memberSince" value={formData?.memberSince} required />
        </Label>
        <br />
        <Submit type="submit" onClick={handleSubmit}>
          Save Profile
        </Submit>
      </StyledForm>
    </Page>
  );
};

export default ProfilePage;

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

const Input2 = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.75rem;
  color: #3d1e1e;
  font-family: helvetica;
  border: 1px solid #3d1e1e;
  border-radius: 5px;
`;

const Input3 = styled.input`
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
