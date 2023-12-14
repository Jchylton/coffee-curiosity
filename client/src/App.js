import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import CoffeeShopPage from "./CoffeeShopPage";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import ProfilePage from "./ProfilePage";
import RecommendationPage from "./RecommendationPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/CoffeeShopPage/:coffee" element={<CoffeeShopPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/ProfilePage/:user" element={<ProfilePage />} />
          <Route
            path="/RecommendationPage/:user/:coffee"
            element={<RecommendationPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
