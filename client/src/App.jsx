import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import "./global.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/layout/Navbar";
import Home from "./pages/home/Home";
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
    location.pathname === '/register';

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
        </Routes>
      )}
    </>
  );
}

export default App;
