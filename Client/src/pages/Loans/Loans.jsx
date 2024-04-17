import React from "react";
import useLoans from "../../hooks/useLoans";
import { PuffLoader } from "react-spinners";
import "./Loans.css";
import LoanCard from "../../components/LoanCard/LoanCard";
import SearchBar from "../../components/SearchBar/SearchBar";

const Loans = () => {
  const { data, isError, isLoading } = useLoans();

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

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

  return (
    <div className="wrapper">
      <div className="flexColStart innerwidth loans-container">
        <SearchBar />
        <div className="paddings flexColStart loans">
          {data.map((loancard, i) => (
            <LoanCard loancard={loancard} key={i} />
          ))}
        </div>
        {/* <div className="flexCenter EMI">
          <h1>EMI Calculator</h1>
        </div> */}
      </div>
    </div>
  );
};

export default Loans;
