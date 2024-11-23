import "./login.css";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login_page">
      <div className="container">
        <div className="row">
          <div className="form-container sign-up">
            <form>
              <h1>Sign In</h1>

              <div className="data">
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <span>or use your Google account</span>
                <div className="social-icons">
                  <Link href="#" className="icon">
                    <FaGoogle />
                  </Link>
                </div>
                <button type="submit">Login</button>
                <a href="/forgetpassword">Forget Password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
