import "./login.css";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchData } from "../../services/fetch"; 
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    if (!email || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetchData("api/users/login", "POST", { email, password });

      if (response.token) {
        localStorage.setItem("token", response.token);
        toast.success('Login successfull!')
        navigate("/");
      } else {
        setErrorMessage(response.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login_page">
      <div className="container">
        <div className="row">
          <div className="form-container sign-in">
            <form onSubmit={handleSubmit}>
              <h1>Sign In</h1>

              <div className="data">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <span>or use your Google account</span>
                <div className="social-icons">
                  <Link to="#" className="icon">
                    <FaGoogle />
                  </Link>
                </div>
                <button type="submit">Login</button>
                <Link to="/forget-password">Forget Password?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
