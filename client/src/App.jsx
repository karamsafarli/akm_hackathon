import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import "./global.css"
function App() {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  );
}

function Pages() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || '/register';

  return (
    <>
      {!isLoginPage ? (
        <>
          <Routes>

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
