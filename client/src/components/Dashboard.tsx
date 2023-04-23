import React, { Fragment, useEffect, useState } from "react";
import { Link, Route, Router, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import FoodListing from "../pages/FoodListing";
import FoodPreference from "../pages/FoodPreference";
import Reward from "../pages/Reward";
import Wastage from "../pages/Wastage";

export default function Dashboard(props: any) {
  const { setAuth } = props;

  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:3001/dashboard/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setName(parseData.username);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const logout = async (e: any) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const isAdmin: boolean = false;

  return (
    <div className='mt-5 text-center'>
      {!isAdmin && (
        <nav>
          <ul className='nav-list'>
            <li>
              <Link to='/dashboard' className='nav-link'>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to='/foodListing' className='nav-link'>
                Food
              </Link>
            </li>
            <li>
              <Link to='/foodPreference' className='nav-link'>
                Preference
              </Link>
            </li>
            <li>
              <Link to='/reward' className='nav-link'>
                Reward
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {isAdmin && (
        <nav>
          <ul className='nav-list'>
            <li>
              <Link to='/foodListing' className='nav-link'>
                Food
              </Link>
            </li>
            <li>
              <Link to='/wastage' className='nav-link'>
                Wastage
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <h1 className='mt-5'>Dashboard</h1>
      <h2>Welcome {name}</h2>
      <button onClick={(e) => logout(e)} className='btn btn-primary'>
        Logout
      </button>
      <nav style={{ marginTop: "10px" }}>
        <ul className='nav-list'>
          <li>
            <Link to='/foodPreference' className='nav-link'>
              Make preference
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
