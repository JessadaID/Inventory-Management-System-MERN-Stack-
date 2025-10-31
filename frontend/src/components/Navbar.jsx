import  UserContext from "../context/userContext";
import { useEffect , useContext } from "react";

function Navbar(){
    const {user , setUser} = useContext(UserContext);
     const seeduser = {
        name: "John Doe",
        email: "ipnioko54@gmail.com",
        password: "password123",
    };

    useEffect(() => {
        setUser(seeduser);
        console.log("User set in Navbar:", user);
    }, []);

    return(
        <nav className="bg-emerald-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="text-lg font-bold">Inventory Management</div>
                <div>
                    <a href="#" className="mr-4 hover:underline">Home</a>
                    <a href="#" className="mr-4 hover:underline">Products</a>
                    <a href="#" className="hover:underline">About</a>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;