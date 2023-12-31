import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl, { Marker, Room } from "react-map-gl";
import { useState, useEffect } from "react";
import RecommendationPage from "./RecommendationPage";
import RoomIcon from "@mui/icons-material/Room";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const TOKEN =
  "pk.eyJ1IjoiamNoeWx0b24iLCJhIjoiY2xxNGhtY242MDdydjJrbXQ1ZWZxZjI2NCJ9.xolos8FfF0kzz3XMdJSGmw";

const TOKEN2 = "bad348c5308142d4b04a8abeae954d98";

const HomePage = () => {
  const navigate = useNavigate();
  const [newPlace, setNewPlace] = useState(null);
  const [viewPort, setViewPort] = useState({
    latitude: 43.4516,
    longitude: -80.495064,
    zoom: 13,
  });

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
  function handleClick(e) {
    console.log(newPlace);
    console.log(e.lngLat);
    const { lat, lng } = e.lngLat;
    setNewPlace({
      lat: lat,
      long: lng,
    });
  }
  return (
    <Page>
      <Wrapper1 style={{ width: "90vw", height: "90vh", zIndex: 999 }}>
        <ReactMapGl
          {...viewPort}
          mapboxAccessToken={TOKEN}
          transitionDuration="100"
          mapStyle="mapbox://styles/jchylton/clq4ipfqv01ap01qmarzc99ez"
          onMove={(viewPort) => setViewPort(viewPort)}
          onDblClick={handleClick}
          dragPan={true}
          scrollZoom={true}
          doubleClickZoom={true}
        >
          {coffeeShops.map((e) => {
            return (
              <Marker
                onClick={() => {
                  navigate(`/CoffeeShopPage/${e.properties.place_id}`);
                }}
                latitude={e?.properties.lat}
                longitude={e?.properties.lon}
                offsetLeft={-3.5 * viewPort.zoom}
                offsetTop={-7 * viewPort.zoom}
              >
                <RoomIcon
                  style={{
                    fontSize: 4.4 * viewPort.zoom,
                    color: "tomato",
                    cursor: "pointer",
                  }}
                />
              </Marker>
            );
          })}
        </ReactMapGl>
      </Wrapper1>
    </Page>
  );
};

export default HomePage;

const Wrapper1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  height: 90vh;
  border: 1px solid black;
`;

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-image: url("/Assets/Coffee.jpg");
`;
