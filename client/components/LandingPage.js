import React from "react";

const LandingPage = () => {
  return (
    <div id="home-section1">
      <div id="home-text">
        <div>
          <h1>The world's first read-to-make smoothie kits.</h1>
          <h3>
            No more worrying about all those bananas going bad. Get delicious
            and nutritious smoothies and smoothie bowls delivered straight to
            your door.
          </h3>
          <button
            type="button"
            onClick={console.log("clicked!")} // TODO: link to All Products component
            className="button"
          >
            Shop All Products
          </button>
        </div>
      </div>
      <div id="home-imageContainer">
        <img src="https://images.unsplash.com/photo-1610450624105-58a2f25f7911?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80" />
      </div>
    </div>
  );
};
