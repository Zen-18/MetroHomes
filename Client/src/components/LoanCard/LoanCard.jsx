import React from "react";
import "./LoanCard.css";
import { useNavigate } from "react-router-dom";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const LoanCard = ({ loancard }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`../loans/${loancard._id}`); // Assuming lawyer ID is used for navigation
  };

  return (
    <div className="flexColStart loan-card" onClick={handleCardClick}>
      {/* Display lawyer-specific information */}
      <div className="lawyer-details">
        <div className="L-details">
          <img src={loancard.image} alt="bank" />
        </div>
        <div className="R-details">
          <span className="primaryText">{loancard.bank}</span>
          <span className="Text">, {loancard.Address}</span>
          <br />
          <span className="orangeText">
            Interest Rate: {loancard.interestRate}%
          </span>
          <br />
          <span className="secondaryText">{loancard.description}</span>
          <br />
          <div className="flexStart contacts">
            <div className="flexStart contact">
              <FaPhoneSquareAlt size={20} color="#1F3E72" />
              <span className="secondaryText">{loancard.contactInfo}</span>
            </div>
            <div className="flexStart contact">
              <BiLogoGmail size={20} color="#1F3E72" />
              <span className="secondaryText">{loancard.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
