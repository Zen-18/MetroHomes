import React, { useState } from "react";
import "./GetStarted.css";
import SendPropertyModal from "../SendProperty/SendPropertyModal";

const GetStarted = () => {
  const [sendmodalOpened, setSendModalOpened] = useState(false);
  const handleSendPropertyClick = () => {
    setSendModalOpened(true);
  };
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Send your Details to MetroHomes</span>
          <span className="secondaryText">
            Do you also want to list your property or list yourselves as a
            Lawyer. Then connect with us on{" "}
            <p className="text">metrohomes977@gmail.com</p>
          </span>

          <div onClick={handleSendPropertyClick} className="button">
            Send Property
          </div>
          <SendPropertyModal
            opened={sendmodalOpened}
            setOpened={setSendModalOpened}
          />
          <span className="secondaryText">
            Make sure to attach all the details needed to list your Property or
            yourselves in the mail.
          </span>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
