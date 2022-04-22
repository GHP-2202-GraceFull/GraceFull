import React from "react";

const LandingPage = () => {
  return (
    <div id="home">
      <div id="home-section1">
        <div id="home-text">
          <div>
            <h1>The world's first ready-to-make smoothie kits.</h1>
            <h2>
              No more worrying about all those bananas going bad. Get delicious
              and nutritious smoothies and smoothie bowls delivered straight to
              your door.
            </h2>
          </div>
          <div>
            <button
              type="button"
              onClick={console.log("clicked!")} // TODO: link to All Products component
              className="button"
            >
              Shop All Products
            </button>
          </div>
        </div>
        <div id="home-imageContainer" />
      </div>
      <div id="home-section2"></div>
    </div>
  );
};

export default LandingPage;
