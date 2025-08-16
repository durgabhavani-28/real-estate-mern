import React, { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
function SignUp() {
  const [formdata,setFormdata] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) =>{
    setFormdata ({
      ...formdata,
      [e.target.id] : e.target.value,
    })
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup',
      {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      }
      );
      const data = await res.json();
      console.log(data);
      if(data.sucess === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
      }
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="username" className="p-3 rounded-lg" id="username" onChange={handleChange}/>
        <input type="text" placeholder="email" className="p-3 rounded-lg" id="email" onChange={handleChange}/>
        <input type="password" placeholder="password" className="p-3 rounded-lg" id="password" onChange={handleChange}/>
        <button disabled={loading} type="submit" className="border cursor-pointer p-3 text-white uppercase border-none rounded-lg hover:opacity-80 disabled:opacity-50" style={{backgroundColor :'#120B0C'}}>
          {loading ? 'Loading...' : 'sign up'}
          </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className="text-blue-600">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">username or email exist</p>}
    </div>
  )
}

export default SignUp
