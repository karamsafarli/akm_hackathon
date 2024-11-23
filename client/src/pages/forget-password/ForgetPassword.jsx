import { useState } from 'react'
import './forgetpassword.css'
import { fetchData } from '../../services/fetch';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    const res = await fetchData(
      'api/users/requestPasswordReset',
      'POST',
      { email }
    );

    if (res.error) return toast.error(res.error);

    toast.success(res.message)
  }
  return (
    <div className="forgetpassword_page">
      <div className="container">
        <div className="row">
          <div className="form-container sign-up">
            <form>
              <h1>Forget Password</h1>

              <div className="data">
                <input type="email" required placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

                <button onClick={onSubmit} type="submit">Reset Password</button>
                <div className="btns">


                  <a href="/login">Login</a>
                  <a href="/register">Sign up</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>)
}

export default ForgetPassword