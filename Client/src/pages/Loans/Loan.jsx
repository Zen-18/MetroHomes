// LoanID.jsx
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getLoan } from "../../utils/api";
import { PuffLoader } from "react-spinners";

const LoanID = () => {
  const { loanId } = useParams();
  const { data, isLoading, isError } = useQuery(["loan", loanId], () =>
    getLoan(loanId)
  );

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching loan details</span>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart innerWidth">
        <h2>{data.bank}</h2>
        <p>
          <strong>Address:</strong> {data.Address}
        </p>
        <p>
          <strong>Interest Rate:</strong> {data.interestRate}%
        </p>
        <p>
          <strong>Description:</strong> {data.description}
        </p>
        {/* Add more loan details here */}
      </div>
    </div>
  );
};

export default LoanID;
