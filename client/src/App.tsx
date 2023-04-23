import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import FoodListing from "./pages/FoodListing";
import Home from "./pages/Home";
import FoodPreference from "./pages/FoodPreference";
import Reward from "./pages/Reward";
import Wastage from "./pages/Wastage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Notification from "./pages/Notification"
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bool: boolean) => {
    setIsAuthenticated(bool);
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const isAdmin: boolean = false;
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/foodListing' element={<FoodListing />} />
          <Route
            path='/foodPreference'
            element={
              isAuthenticated ? (
                <FoodPreference />
              ) : (
                <Navigate replace to='/login' />
              )
            }
          />
          <Route path='/reward' element={<Reward />} />
          <Route path='/wastage' element={<Wastage />} />
          <Route
            path='/login'
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate replace to='/dashboard' />
              )
            }
          />
          <Route
            path='/register'
            element={
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate replace to='/login' />
              )
            }
          />
          <Route
            path='/dashboard'
            element={
              isAuthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate replace to='/login' />
              )
            }
          />
          <Route path="/notification" element={
            isAuthenticated ? (
              <Notification />
            ) : (
              <Navigate replace to='/login' />
            )}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
