import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import FoodListing from "./pages/FoodListing";
import Home from "./pages/Home";
import FoodPreference from "./pages/FoodPreference";
import Reward from "./pages/Reward";
import Wastage from "./pages/Wastage";

function App() {
  const isAdmin: boolean = false;
  return (
    <div className="App">
      <Router>
        {!isAdmin && (
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/foodListing" className="nav-link">
                  Food
                </Link>
              </li>
              <li>
                <Link to="/foodPreference" className="nav-link">
                  Preference
                </Link>
              </li>
              <li>
                <Link to="/reward" className="nav-link">
                  Reward
                </Link>
              </li>
            </ul>
          </nav>
        )}
        {isAdmin && (
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="/foodListing" className="nav-link">
                  Food
                </Link>
              </li>
              <li>
                <Link to="/wastage" className="nav-link">
                  Wastage
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foodListing" element={<FoodListing />} />
          <Route path="/foodPreference" element={<FoodPreference />} />
          <Route path="/reward" element={<Reward />} />
          <Route path="/wastage" element={<Wastage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
