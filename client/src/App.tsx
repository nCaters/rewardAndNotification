import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import FoodListing from "./pages/FoodListing";
import Home from "./pages/Home"

function App() {
  return (
    <div className="App">
    <Router>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/foodListing" className="nav-link">Food</Link>
          </li>
          <li>
            <Link to="/canteenStaff" className="nav-link">Canteen Staff</Link>
          </li>
          <li>
            <Link to="/admin" className="nav-link">Admin</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foodListing" element={<FoodListing />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
