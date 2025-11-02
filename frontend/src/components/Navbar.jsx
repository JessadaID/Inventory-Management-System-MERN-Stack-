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
    <nav className="bg-slate-900 border-b border-slate-800 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
           
            <span className="text-white font-semibold text-lg tracking-tight">
              Inventory Management
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
            >
              Home
            </Link>
            
            <Link 
              to="/Dashboard" 
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
            >
              Dashboard
            </Link>

            {!user && (
              <>
                <Link 
                  to="/Login" 
                  className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/Register" 
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700"
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-slate-200 text-sm font-medium">
                    {user.name}
                  </span>
                </div>
                
                <button 
                  onClick={handleLogout} 
                  className="px-4 py-2 bg-slate-800 hover:bg-red-900 text-slate-300 hover:text-white text-sm font-medium rounded-lg transition-all border border-slate-700 hover:border-red-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;