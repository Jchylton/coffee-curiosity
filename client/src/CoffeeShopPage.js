import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TOKEN2 = "bad348c5308142d4b04a8abeae954d98";

const CoffeeShopPage = () => {
  const { coffee } = useParams();
  const [coffeeShop, setCoffeeShop] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.geoapify.com/v2/places?categories=catering.cafe.coffee_shop,catering.cafe.coffee,catering.cafe&filter=circle:-80.495064,43.4516,1000&limit=20&apiKey=${TOKEN2}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.features);
        setCoffeeShop(
          data.features.find((c) => {
            return c.properties.place_id == coffee;
          })
        );
      });
  }, []);
  console.log(coffeeShop);
  console.log(coffee);
  return (
    <div>
      <h1>{coffeeShop?.properties.name}</h1>
      <h1>{coffeeShop?.properties.address_line2}</h1>
      <h1>{coffeeShop?.properties.datasource.raw.website}</h1>
      <h1>{coffeeShop?.properties.datasource.raw.amenity}</h1>
    </div>
  );
};

export default CoffeeShopPage;
