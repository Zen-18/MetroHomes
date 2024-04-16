import React from "react";
import "./LawyerCard.css";
import { useNavigate } from "react-router-dom";
import { AiFillPicture } from "react-icons/ai";

const LawyerCard = ({ lcard }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`../lawyers/${lcard._id}`); // Assuming lawyer ID is used for navigation
  };

  return (
    <div className="flexColStart r-card" onClick={handleCardClick}>
      {/* Display lawyer-specific information */}
      <div>{lcard.image && <img src={lcard.image} alt="Profile" />}</div>

      <div className="lawyer-details">
        <span className="primaryText">{lcard.name}</span>
        <br />
        <span className="orangeText">{lcard.firm}</span>
        <br />
        <span className="secondaryText">{lcard.location}</span>
        {/* Add more lawyer-specific details here */}
      </div>
    </div>
  );
};

export default LawyerCard;
