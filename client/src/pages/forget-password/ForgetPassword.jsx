import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

import './forgetpassword.css'
const ForgetPassword = () => {
  return (
    <div className="forgetpassword_page">
    <div className="container">
      <div className="row">
        <div className="form-container sign-up">
          <form>
            <h1>Forget Password</h1>

            <div className="data">
              <input type="email" placeholder="Email" />
               
              <button type="submit">Reset Password</button>
              <div className="btns">

            
              <a href="/login">Login</a>
              <a href="/register">Sign up</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>  )
}

export default ForgetPassword