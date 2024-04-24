import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuthContext } from "../../hooks/useAuthContext";
import { deleteLoan } from "../../utils/api";
import { useMutation } from "react-query";
import { truncate } from "lodash";
import "./LoanCard.css";

const LoanCard = ({ loancard }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate(); // Updated to useNavigate hook
  const [isAdmin, setIsAdmin] = useState(false); // State to store isAdmin flag
  const { user } = useAuthContext();
  const id = pathname.split("/").slice(-1)[0];

  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const deleteMutation = useMutation(deleteLoan, {
    onSuccess: () => {
      // Redirect to the homepage after successful deletion
      navigate("/loans"); // Updated to use navigate function
    },
  });

  const handleLoanDelete = () => {
    // Pass the loan plan ID to the deleteLoan function
    deleteMutation.mutate(id);
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
            Loan Plan: {truncate(loancard.description, { length: 100 })}
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
