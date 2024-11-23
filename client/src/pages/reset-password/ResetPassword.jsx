import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./resetpassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchData } from "../../services/fetch";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{10,}$/;

    return regex.test(password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!newPassword || !confirmPassword) {
      setErrorMessage("Please fill out both fields.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setErrorMessage(
        "Password must be at least 10 characters, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const res = await fetchData(
      `api/users/passwordReset/${token}`,
      'POST',
      { newPassword }
    );


    if (res.error) return toast.error(res.error);

    toast.success(res.message);

    setTimeout(() => navigate('/login'), 1000);

  };

  return (
    <div className="resetpassword_page">
      <div className="container">
        <div className="row">
          <div className="form-container resetpassword">
            <form onSubmit={handleSubmit}>
              <h1>Reset Password</h1>

              <div className="data">
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="password-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="password-toggle"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
