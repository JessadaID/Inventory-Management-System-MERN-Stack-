import "./App.css";
import { UserProvider } from "./context/userContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
function App() {
  return (
    <>
      <UserProvider>
        {/*<Navbar />*/}
        <Dashboard />
      </UserProvider>
    </>
  );
}

export default App;
