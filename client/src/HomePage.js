import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl from "react-map-gl";
import { useState } from "react";

const TOKEN =
  "pk.eyJ1IjoiamNoeWx0b24iLCJhIjoiY2xxNGhtY242MDdydjJrbXQ1ZWZxZjI2NCJ9.xolos8FfF0kzz3XMdJSGmw";

const HomePage = () => {
  const [viewPort, setViewPort] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 6,
  });
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactMapGl
        {...viewPort}
        mapboxAccessToken={TOKEN}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle="mapbox://styles/jchylton/clq4ipfqv01ap01qmarzc99ez"
      ></ReactMapGl>
    </div>
  );
};

export default HomePage;
