import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import { baseUrl, postRequest } from "../utils/api.js";

export const VerifyEmail = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get("emailToken");

  console.log(user);
  console.log("emailToken", emailToken);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.isVerified) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        if (emailToken) {
          setIsLoading(true);

          const response = await postRequest(
            `${baseUrl}/users/verify-email`,
            JSON.stringify({ emailToken })
          );

          setIsLoading(false);
          console.log("res", response);

          if (response.error) {
            return setError(response);
          }

          updateUser(response);
        }
      }
    };
  }, [emailToken, user]);

  return (
    <div>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div>
          {user?.isVerified ? (
            <div>
              <Alert severity="success">
                Email successfully verified, redirecting...
              </Alert>
            </div>
          ) : (
            <div>
              {error.error ? (
                <Alert severity="error">{error.message}</Alert>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
