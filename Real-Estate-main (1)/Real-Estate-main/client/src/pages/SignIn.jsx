// SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userslice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInFailure('Please enter both email and password'));
      return;
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.sucess === false) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signin</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="email" className="p-3 rounded-lg" id="email" onChange={handleChange} />
        <input type="password" placeholder="password" className="p-3 rounded-lg" id="password" onChange={handleChange} />
        <button disabled={loading} type="submit" className="border cursor-pointer p-3 text-white uppercase border-none rounded-lg hover:opacity-80 disabled:opacity-50" style={{ backgroundColor: '#120B0C' }}>
          {loading ? 'Loading...' : 'sign in'}
        </button>
        <OAuth></OAuth>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className="text-blue-600">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default SignIn;
