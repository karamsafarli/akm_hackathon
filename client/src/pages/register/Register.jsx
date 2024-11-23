import "./register.css";
import { FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../services/fetch";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{10,}$/;

        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (!validatePassword(password)) {
            setError(
                "Password must be at least 10 characters, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const result = await fetchData("api/users/register", "POST", {
                name,
                email,
                password,
            });

            if (result.error) {
                setError(result.error);
            } else {
                return navigate('/login')
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="signup_page">
            <div className="container">
                <div className="row">
                    <div className="form-container sign-up">
                        <form onSubmit={handleSubmit}>
                            <h1>Create Account</h1>

                            <div className="data">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <div className="password-container">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <span
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className="password-toggle"
                                    >
                                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                <div className="password-container">
                                    <input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Password Again"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                    <span
                                        onClick={() =>
                                            setConfirmPasswordVisible(!confirmPasswordVisible)
                                        }
                                        className="password-toggle"
                                    >
                                        {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                {error && <p className="error-message">{error}</p>}

                                <span>or use your Google account</span>
                                <div className="social-icons">
                                    <Link href="#" className="icon">
                                        <FaGoogle />
                                    </Link>
                                </div>
                                <button type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
