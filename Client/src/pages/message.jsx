import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";

export const Message = () => {
  const { user } = useContext(AuthContext);
  console.log("User:", user);

  return (
    <Container>
      <h1>
        Email: {user?.email} ---- {""}
        {user?.isVerified ? (
          <span className="verified">verified</span>
        ) : (
          <span className="not-verified">Not verified</span>
        )}
      </h1>
    </Container>
  );
};
