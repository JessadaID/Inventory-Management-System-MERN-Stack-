import { createContext, useState } from "react";
import { useEffect } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // เรียก API /api/user/profile - cookie จะถูกส่งไปอัตโนมัติ
      const response = await fetch("http://localhost:3000/api/users/profile", {
        credentials: "include",
      });
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
