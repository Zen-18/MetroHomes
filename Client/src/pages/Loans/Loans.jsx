import React, { useState } from "react";
import useLoans from "../../hooks/useLoans";
import { PuffLoader } from "react-spinners";
import "./Loans.css";
import LoanCard from "../../components/LoanCard/LoanCard";
import SearchBar from "../../components/SearchBar/SearchBar";

const Loans = () => {
  const { data, isError, isLoading } = useLoans();
  const [loanTermYears, setLoanTermYears] = useState("");
  const [totalLoanAmount, setTotalLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanEMIAmount, setLoanEMIAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [totalInterest, setTotalInterest] = useState("");

  const calculateEMI = () => {
    // Convert input values to numbers
    const principal = parseFloat(totalLoanAmount);
    const rateOfInterest = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const numberOfPayments = parseFloat(loanTermYears) * 12; // Total number of payments

    // Calculate EMI using formula: EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
    const emi =
      (principal *
        rateOfInterest *
        Math.pow(1 + rateOfInterest, numberOfPayments)) /
      (Math.pow(1 + rateOfInterest, numberOfPayments) - 1);

    // Round off EMI to 2 decimal places and update state
    setLoanEMIAmount(emi.toFixed(2));

    // Calculate total loan amount
    const totalAmt = emi * numberOfPayments;
    setTotalAmount(totalAmt.toFixed(2));

    // Calculate total interest
    const totalInt = totalAmt - principal;
    setTotalInterest(totalInt.toFixed(2));
  };

  const resetFields = () => {
    setLoanTermYears("");
    setTotalLoanAmount("");
    setInterestRate("");
    setLoanEMIAmount("");
    setTotalAmount("");
    setTotalInterest("");
  };

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
        <div className="paddings flexColStart loans">
          {data.map((loancard, i) => (
            <LoanCard loancard={loancard} key={i} />
          ))}
        </div>
        <div className="EMI">
          <div style={{ marginLeft: "8rem", marginTop: "1rem" }}>
            <h1>EMI Calculator</h1>
          </div>
          <div className="calculator">
            <div className="number">
              <div className="Text">Loan Term Years</div>
              <input
                type="number"
                placeholder="No. of Years"
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(e.target.value)}
                style={{
                  borderRadius: "8px",
                  textAlign: "center",
                  width: "140px",
                }}
              />
              <div className="Text" style={{ marginTop: "1rem" }}>
                Interest Rate{" "}
              </div>
              <input
                type="number"
                placeholder="Interest Rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                style={{
                  borderRadius: "8px",
                  textAlign: "center",
                  width: "140px",
                }}
              />
              <div className="Text" style={{ marginTop: "1rem" }}>
                Total Loan Amount
              </div>
              <input
                type="number"
                placeholder="Total Loan Amount"
                value={totalLoanAmount}
                onChange={(e) => setTotalLoanAmount(e.target.value)}
                style={{ borderRadius: "8px", textAlign: "center" }}
              />
              <div className="Text" style={{ marginTop: "1rem" }}>
                Loan EMI Amount
              </div>
              <input
                type="text"
                placeholder="Loan EMI Amount"
                value={loanEMIAmount}
                readOnly
                style={{ borderRadius: "8px", textAlign: "center" }}
              />
              <div className="Text" style={{ marginTop: "1rem" }}>
                Total Interest
              </div>
              <input
                type="text"
                placeholder="Total Interest"
                value={totalInterest}
                readOnly
                style={{ borderRadius: "8px", textAlign: "center" }}
              />
              <div className="Text" style={{ marginTop: "1rem" }}>
                Total Amount
              </div>
              <input
                type="text"
                placeholder="Total Amount"
                value={totalAmount}
                readOnly
                style={{ borderRadius: "8px", textAlign: "center" }}
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <button onClick={calculateEMI} className="button1">
                Calculate EMI
              </button>
              <button onClick={resetFields} className="button2">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
