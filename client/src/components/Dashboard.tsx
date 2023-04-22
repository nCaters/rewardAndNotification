import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  return (
    <div>
      <h1 className='mt-5'>Dashboard</h1>
      <h2>Welcome {name}</h2>
      <button onClick={(e) => logout(e)} className='btn btn-primary'>
        Logout
      </button>
    </div>
  );
}
