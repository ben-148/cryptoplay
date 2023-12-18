// Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import "./HomePage2.css"; // Combined CSS file

const Home2 = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Section */}
      <Featured />
    </div>
  );
};

export default Home2;
