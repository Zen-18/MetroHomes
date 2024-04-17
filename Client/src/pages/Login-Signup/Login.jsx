import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import "./login.css"; // Import the CSS file
import { Link } from "react-router-dom";
import { TiInputCheckedOutline } from "react-icons/ti";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("client");
  const { login, error, isLoading } = useLogin();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, userType);
  };

  return (
    <div className="form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logo">
          <img src="J.png" alt="" width={230} />
        </div>

        <h3>Login to MetroHomes</h3>

        <label>Email:</label>
        <input
          className="input"
          type="email"
          placeholder="E-mail Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="forgot Text">
          <u>
            <Link to="/forgot-password">Forgot password?</Link>
          </u>
        </div>
        <div className="user-type">
          <label>Role:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="client">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button disabled={isLoading} className="button">
          {isLoading ? "Logging in..." : "Log in"}
        </button>
        {error && <div className="error">{error}</div>}
        <p>
          Don't have an account?
          <u>
            <Link to="/signup">Sign up</Link>
          </u>
        </p>
      </form>
    </div>
  );
};

export default Login;
