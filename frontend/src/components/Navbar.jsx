import UserContext from "../context/userContext";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const seeduser = {
    name: "John Doe",
    email: "ipnioko54@gmail.com",
    password: "password123",
  };

  useEffect(() => {
    setUser(seeduser);
  }, []);

  return (
    <nav className="bg-emerald-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-lg font-bold">Inventory Management</div>
        <Link to="/"> Home</Link>
        <div>
          {user ? (
            <span>Welcome, {user.name}</span>
          ) : (
            <span>Loading user...</span>
          )}
        </div>
        <Link to="/Login"> Login</Link>
        <Link to="/Register"> Register</Link>
        <Link to="/Dashboard"> Dashboard</Link>
      </div>
    </nav>
  );
}
export default Navbar;
