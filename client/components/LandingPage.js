import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div id="home">
      <div id="home-section1">
        <div id="home-text">
          <div>
            <h1>The world's first ready-to-make smoothie kits.</h1>
            <p>
              No more worrying about all those bananas going bad. Get delicious
              and nutritious smoothies and smoothie bowls delivered straight to
              your door.
            </p>
          </div>
          <div>
            <Link to="/products">
              <button type="button" className="button">
                Shop All Products
              </button>
            </Link>
          </div>
        </div>
        <div id="home-imageContainer" />
      </div>
      <div id="home-section2"></div>
    </div>
  );
};

export default LandingPage;
