import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import CoffeeShopPage from "./CoffeeShopPage";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import ProfilePage from "./ProfilePage";
import RecommendationPage from "./RecommendationPage";

const TOKEN2 = "bad348c5308142d4b04a8abeae954d98";

function App() {
  const [coffeeShops, setCoffeeShops] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.geoapify.com/v2/places?categories=catering.cafe.coffee_shop,catering.cafe.coffee,catering.cafe&filter=circle:-80.495064,43.4516,1000&limit=20&apiKey=${TOKEN2}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCoffeeShops(data.features);
      });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route
            path="/CoffeeShopPage/:coffee"
            element={<CoffeeShopPage coffeeShops={coffeeShops} />}
          />
          <Route
            path="/HomePage"
            element={
              <HomePage
                coffeeShops={coffeeShops}
                setCoffeeShops={setCoffeeShops}
              />
            }
          />
          <Route path="/ProfilePage/:user" element={<ProfilePage />} />
          <Route
            path="/RecommendationPage/:coffee"
            element={<RecommendationPage coffeeShops={coffeeShops} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
