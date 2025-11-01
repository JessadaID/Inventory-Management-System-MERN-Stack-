import "./App.css";
import { UserProvider } from "./context/userContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import { Route, Routes , useLocation } from "react-router-dom";

function App() {

  const location = useLocation();
  const hideNavbarPaths = ['/dashboard'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname.toLowerCase());
  
  return (
    <>
      <UserProvider>
        {shouldShowNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
