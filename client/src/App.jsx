import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import "./global.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/layout/Navbar";
import Home from "./pages/home/Home";
import ForgetPassword from "./pages/forget-password/ForgetPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/profile/Profile";
import Calculate from "./pages/calculate/Calculate";
function App() {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  );
}

function Pages() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" ||
    location.pathname === '/register' ||
  location.pathname === '/forget-password'  || 
    location.pathname.includes('/reset-password');

  return (
    <>
      {!isLoginPage ? (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/calculate' element={<Calculate />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
      )}


      <ToastContainer />
    </>
  );
}

export default App;
