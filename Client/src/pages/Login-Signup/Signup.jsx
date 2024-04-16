import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <div className="form-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="logo">
          <img src="J.png" alt="" width={230} />
        </div>
        <h3>Sign up to MetroHomes</h3>

        <label>Email:</label>
        <input
          type="email"
          placeholder="E-mail Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading} className="button">
          Sign Up
        </button>
        {error && <div className="error">{error}</div>}
        <div className="option">
          <p>Already have a account?</p>
          <u>
            <Link to="/login">Login</Link>
          </u>
        </div>
      </form>
    </div>
  );
};

export default Signup;
