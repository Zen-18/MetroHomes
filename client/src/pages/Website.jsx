import React from "react";
import Hero from '../components/Hero/Hero';
import Companies from "../components/companies/companies";
import Residencies from "../components/residencies/Residencies";
import Value from "../components/Value/Value";
import GetStarted from "../components/GetStarted/GetStarted";

const Website = () => {
    return(
        <div className="App">
        <div>
          <div className="white-gradient"/>
          <Hero/>
        </div>
          <Companies/>
          <Residencies/>
          <Value/>
          <GetStarted/>
      </div>
    )
}

export default Website