import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="Email" value={formData?.Email} required />
        </label>
        <br />
        <label>
          Member Since:
          <input name="memberSince" value={formData?.memberSince} required />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;

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
