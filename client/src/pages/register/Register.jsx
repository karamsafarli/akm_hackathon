import "./register.css";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="signup_page">
      <div className="container">
        <div className="row">
          <div className="form-container sign-up">
            <form>
              <h1>Create Account</h1>

              <div className="data">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Password Again" />
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
  )
}

export default Register