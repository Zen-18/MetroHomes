import React from "react";
import "./GetStarted.css";
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Send your Property to MetroHomes</span>
          <span className="secondaryText">
            Do you want to list your property as well.
            <br />
            Then connect with us.
          </span>
          <button className="button">
            <a href="mailto:sherchankrish2715@gmail.com">Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
