import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/axiosInstance.js";
const Login = () => {
    const navigate=useNavigate()
  const [values, setvalues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const handleValues = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("clicked");
    const errors = {};
    if (!values.email) {
      errors.email = "Please enter email";
    }
    if (!values.password) {
      errors.password = "Please enter password";
    }
    setError(errors);
    if (Object.keys(errors).length == 0) {
      try{
        const response=await axiosInstance.post('admin/admin-login',values);
        console.log(JSON.stringify(response,null,2));
        if(response.data && response.data.accessToken){
          
            localStorage.setItem('token',response.data.accessToken);
            navigate('/dashboard')
        }
      }
      catch(error){
        if(error.response && error.response.data && error.response.data.message){
            const errors={}
            errors.message=error.response.data.message
            setError(errors)
        }
        console.log(error)

      }
    }
  };
  return (
    <div className="">
      <form action="" onSubmit={handleSubmit}>
        <h1>Sign in to account</h1>

        <div>
          <label htmlFor="">Email Address</label>
          <input
            name="email"
            value={values.email}
            type="text"
            onChange={handleValues}
          />
          {error.email && <span className="text-red">{error.email}</span>}
        </div>
        <div>
          <label htmlFor="">Email Address</label>
          <input
            name="password"
            value={values.password}
            type="text"
            onChange={handleValues}
          />
          {error.password && <span>{error.password}</span>}
        </div>
        <button type="submit">Sign In</button>
        {error.message && <span>{error.message}</span>}
      </form>
    </div>
  );
};

export default Login;
