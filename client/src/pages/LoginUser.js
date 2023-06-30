import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setCheck] = useState(false);
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();

  // Login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ username, password, checked });
    if (res) {
      navigate("/");
    }
  };

  const onChangeCheckbox = (e) => {
    setCheck(!checked);
  };

  return (
    <div className="login-user">
      <div className="login">
        <div>
          <Link to="/register" className="btn btn-outline-warning float-right">
            {" "}
            Register{" "}
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <label>Username</label>
          <input
            type="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br></br>
          <input
            type="checkbox"
            id="check"
            checked={checked}
            onChange={onChangeCheckbox}
          />
          <label id="checklabel" for="check">
            {" "}
            Remember me
          </label>
          <br></br>

          <button className="rounded" disabled={isLoading}>
            Login
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};
export default Login;
