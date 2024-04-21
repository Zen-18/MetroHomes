import React, { useState } from "react";
import { getTokenPassword } from "../../utils/api";
import { resetPassword } from "../../utils/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const { getPasswordToken, loading } = getTokenPassword();
  const { userResetPassword, loading: passwordLoading } = resetPassword();
  let { emailToken } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const resetPasswordUser = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError(true);
      return;
    }
    setError(null);
    await userResetPassword(password, emailToken);
    navigate("/login");
  };
  const getToken = async (e) => {
    e.preventDefault();
    if (!email) {
      setError(true);
      return;
    }
    setError(null);
    getPasswordToken(email);
    console.log(token);
  };

  return (
    <div>
      <div className="form-wrapper">
        <form
          className="login-form"
          style={{ height: "300px", marginTop: "16rem" }}
        >
          {!emailToken && (
            <>
              <h3>Get Token on Email.</h3>
              <label>Email:</label>
              <input
                className="input"
                type="email"
                placeholder="E-mail Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button className="button" disabled={loading} onClick={getToken}>
                {loading ? "Sending..." : "Get Token"}
              </button>
              {error && <p>Email is Required</p>}
            </>
          )}
          {emailToken && (
            <>
              <label>New Password:</label>
              <input
                className="input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <label>Re Enter Password:</label>
              <input
                className="input"
                type="password"
                placeholder="Password"
                onChange={(e) => setRePassword(e.target.value)}
                value={rePassword}
              />
              {error && <p>Password does not match</p>}
              <button
                className="button"
                disabled={passwordLoading}
                onClick={resetPasswordUser}
              >
                {loading ? "Reseting..." : "Reset Password"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
