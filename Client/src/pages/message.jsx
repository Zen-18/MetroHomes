import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
import { baseUrl, getEmailVerification } from "../utils/api.js";
import { toast } from "react-toastify";

export const Message = () => {
  const { user } = useContext(AuthContext);
  console.log("User:", user);
  const handleEmailVerfication = async () => {
    try {
      toast.success("Email was sent");
      const response = await getEmailVerification(user);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="flexCenter paddings"
      style={{
        background: "white",
        height: "80vh",
        width: "100rem",
        marginTop: "5rem",
      }}
    >
      <div className="flexCenter innerWidth paddings">
        <img src="./email.png" alt="" width={200} />
      </div>
      <div
        className="flexCenter innerWidth paddings"
        style={{ width: "100%", marginTop: "-5rem" }}
      >
        <h1 className="primaryText">
          Email Address: {user?.email}
          <br />{" "}
          <div className="flexCenter innerWidth">
            Status: {""}
            {user?.isVerified ? (
              <span className="verified">verified</span>
            ) : (
              <span className="not-verified">Not verified</span>
            )}
          </div>
        </h1>
      </div>
      <div className="flexCenter innerWidth paddings" style={{ width: "100%" }}>
        <p style={{ fontSize: "20px" }}>
          To verify you account please press{" "}
          <u className="orangeText">Get Verification Link</u> button below
        </p>
      </div>
      <div
        className="flexCenter innerWidth paddings"
        style={{ width: "100%", marginTop: "-5rem" }}
      >
        <button onClick={handleEmailVerfication} className="button">
          Get Verification Link
        </button>
      </div>
    </div>
  );
};
