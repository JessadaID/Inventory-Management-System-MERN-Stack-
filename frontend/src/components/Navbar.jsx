import UserContext from "../context/userContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logout from "./auth/Logout";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setUser(null);
      alert("ออกจากระบบสำเร็จ");
      navigate("/");
    } else {
      alert("เกิดข้อผิดพลาดในการออกจากระบบ");
    }
  };

  return (
    <nav className="bg-emerald-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-lg font-bold">Inventory Management</div>
        <Link to="/"> Home</Link>
        <div>
          {user ? ( // If user exists, show welcome and logout
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={handleLogout} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </>
          ) : null}
        </div>
        {!user && <Link to="/Login"> Login</Link>}
        <Link to="/Register"> Register</Link>
        <Link to="/Dashboard"> Dashboard</Link>
      </div>
    </nav>
  );
}
export default Navbar;
