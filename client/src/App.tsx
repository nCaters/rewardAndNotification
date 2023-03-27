import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import FoodListing from "./pages/FoodListing";
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/foodListing">Food</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/foodListing" Component={FoodListing} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
