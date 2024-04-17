import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getLawyer } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import "./Lawyer.css";
import Map from "../../components/Map/Map";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const Lawyer = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError } = useQuery(["lawyer", id], () =>
    getLawyer(id)
  );
  console.log(data);
  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth law-container">
        {/*Lawyer info*/}
        <div className="lawyer">
          {/*Profile image*/}
          <div className="img">
            <img src={data?.image} alt="Profile Image" />
          </div>

          <div className="law-details">
            <div className="flexStart name">
              <span className="primaryText">Name: {data?.name}</span>
            </div>
            <div className="flexStart">
              <span className="orangeText">Firm: {data?.firm}</span>
            </div>
            <div className="flexStart contacts">
              <div className="flexStart contact">
                <FaPhoneSquareAlt size={20} color="#1F3E72" />
                <span className="secondaryText">{data?.phoneNumber}</span>
              </div>
              <div className="flexStart contact">
                <BiLogoGmail size={20} color="#1F3E72" />
                <span className="secondaryText">{data?.email}</span>
              </div>
            </div>
            <div>
              <span className="secondaryText">
                Qualifications and Certifications: {data?.qualification}
              </span>
            </div>
            <div>
              <span className="secondaryText">
                Experience: {data?.experience}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lawyer;
