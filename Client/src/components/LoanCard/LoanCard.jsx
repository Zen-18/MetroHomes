import React, { useEffect, useState } from "react";
import "./LoanCard.css";
import { useNavigate } from "react-router-dom";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuthContext } from "../../hooks/useAuthContext";
import { deleteLoan } from "../../utils/api";
import { useMutation } from "react-query";

const LoanCard = ({ loancard }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // State to store isAdmin flag
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleLoanDelete = () => {
    // Pass the loan plan ID to the deleteLoan function
    navigate(`../loans/${loancard._id}`);
  };

  return (
    <div className="flexColStart loan-card">
      {/* Display lawyer-specific information */}
      <div className="lawyer-details">
        <div className="L-details">
          <img src={loancard.image} alt="bank" width={155} />
        </div>
        <div className="R-details">
          <span className="primaryText">{loancard.bank}</span>
          <span className="Text">, {loancard.Address}</span>
          <br />
          <span className="orangeText">
            Interest Rate: {loancard.interestRate}%
          </span>
          <br />
          <span className="secondaryText">
            Loan Plan: {loancard.description}
          </span>
          <br />
          <span className="secondaryText">
            Documents Required: {loancard.documents}
          </span>
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
          {isAdmin && (
            <div className="del" onClick={handleLoanDelete}>
              <RiDeleteBin6Line size={35} color="red" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
