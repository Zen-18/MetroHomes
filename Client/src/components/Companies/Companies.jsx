import React from "react";
import "./Companies.css";

const Companies = () => {
  return (
    <section className="c-wrapper">
      <div className="primaryText flexColCenter head">
        Our Real Estate Partners
      </div>
      <div className="secondaryText flexColCenter">
        Trusted real estate partners for seamless property transactions and
        unparalleled expertise
      </div>
      <div className="paddings innerWidth flexCenter c-container">
        <div className="line1">
          <img src="./com1.png" alt="" />
          <img src="./com2.png" alt="" />
        </div>
        <div className="line2">
          <img src="./com3.png" alt="" />
          <img src="./com4.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Companies;
