import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register(props: any) {
  const navigate = useNavigate();
  const { setAuth } = props;

  const [inputs, setInputs] = useState({
    role_id: 1,
    username: "",
    email: "",
    password: "",
  });

  const { role_id, username, email, password } = inputs;

  const onChangeInput = (e: any) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onChangeSelect = (e: any) => {
    console.log("value", e.target.name);
    console.log("value", e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();

    try {
      const body = { role_id, username, email, password };
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }

      console.log(parseRes);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className='mt-5 text-center'>
        <h1>Register</h1>
        <form onSubmit={onSubmitForm}>
          <select
            id='role_id'
            name='role_id'
            className='form-select'
            onChange={(e) => onChangeSelect(e)}
          >
            <option value='1'>NCS Staff</option>
            <option value='2'>NCS Caterer</option>
            <option value='0'>Admin</option>
          </select>
          <input
            type='text'
            name='username'
            placeholder='username'
            className='form-control my-3'
            value={username}
            onChange={(e) => onChangeInput(e)}
          />
          <input
            type='email'
            name='email'
            placeholder='email'
            className='form-control my-3'
            value={email}
            onChange={(e) => onChangeInput(e)}
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            className='form-control my-3'
            value={password}
            onChange={(e) => onChangeInput(e)}
          />
          <button className='btn btn-outline-primary px-5'>Submit</button>
        </form>
        <button
          className='btn btn-outline-primary mt-3 px-5'
          onClick={() => navigate("/register")}
        >
          Login
        </button>
      </div>
    </Fragment>
  );
}
