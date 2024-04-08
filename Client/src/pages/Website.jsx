import React from "react";
import Hero from "../components/Hero/Hero";
import Companies from "../components/Companies/Companies";
import Residencies from "../components/Residencies/Residencies";
import Value from "../components/Value/Value";
import GetStarted from "../components/Get Started/GetStarted";

const Website = () => {
  return (
    <div className="App">
      <div>
        <Hero />
        <div>
          <Residencies />
          <Value />
          <Companies />
          <GetStarted />
        </div>
      </div>
    </div>
  );
};

export default Website;
