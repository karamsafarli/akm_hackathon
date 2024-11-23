import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import "./global.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/layout/Navbar";
import Home from "./pages/home/Home";
import ForgetPassword from "./pages/forget-password/ForgetPassword";
import { ToastContainer } from 'react-toastify';

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
    location.pathname === '/forget-password';

  return (
    <>
      {!isLoginPage ? (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
      )}


      <ToastContainer />
    </>
  );
}

export default App;
