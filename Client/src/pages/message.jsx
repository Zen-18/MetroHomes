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
  const toastaaa = () => {
    toast.success("Wow so easy!");
  };

  return (
    <>
      <h1>
        Email: {user?.email} ---- {""}
        {user?.isVerified ? (
          <span className="verified">verified</span>
        ) : (
          <span className="not-verified">Not verified</span>
        )}
      </h1>
      <p>
        To verify you account please press <u>Get Verification Link</u> button
        below
      </p>
      <button onClick={handleEmailVerfication} className="button">
        Get Verification
      </button>{" "}
      <button onClick={toastaaa} className="button">
        Get Verification
      </button>
    </>
  );
};
