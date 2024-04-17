import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import "./Lawyers.css";
import useLawyers from "../../hooks/useLawyers.jsx";
import { PuffLoader } from "react-spinners";
import LawyerCard from "../../components/LawyerCard/LawyerCard.jsx";

const Lawyers = () => {
  const { data, isError, isLoading } = useLawyers();

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
      <div className="flexColStart innerwidth lawyers-container">
        <SearchBar />

        <div className="paddings flexCenter lawyers">
          {data.map((lcard, i) => (
            <LawyerCard lcard={lcard} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lawyers;
