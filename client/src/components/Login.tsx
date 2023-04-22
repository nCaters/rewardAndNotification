import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login(props: any) {
  const { setAuth } = props;

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChangeInput = (e: any) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e: any) => {
    e.preventDefault();

    const body = { email, password };
    const response = await fetch("http://localhost:3001/auth/login", {
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
      toast.success("Logged in Successfully");
    } else {
      setAuth(false);
      toast.error(parseRes);
    }

    console.log(parseRes);

    try {
      console.log(e.target);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className='mt-5 text-center'>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => onChangeInput(e)}
          className='form-control my-3'
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => onChangeInput(e)}
          className='form-control my-3'
        />
        <button className='btn btn-success btn-block'>Login</button>
      </form>
      <Link to='/register'>register</Link>
    </Fragment>
  );
}
