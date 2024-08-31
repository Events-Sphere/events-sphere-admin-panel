import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../App/Features/Api/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../App/Features/Auth/authSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
const Login = () => {
  useEffect(() => {}, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitLogin] = useLoginMutation();

  const validate = () => {
    let valid = true;
    let errors = { email: "", password: "" };

    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };
  const [navigateReady, setNavigateReady] = useState(false);

// useEffect(() => {
//   if (navigateReady) {
//     console.log('Credentials set, now navigating...');
//     navigate("/dashboard");
//   }
// }, [navigateReady]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        setLoading(true);
        
        const response = await submitLogin({ email, password }).unwrap();
        if (response.status === true) {
          console.log(response)
          console.log('Dispatching credentials...');
         const data= await dispatch(setCredentials({ token: response.accessToken }));
         
      console.log(data);
      navigate("/dashboard");
      //     // Ensure the dispatch has completed before navigation
      //     console.log('Credentials set, now navigating...');
      //     navigate("/dashboard");
        } else {
          
          setLoading(false);
          alert(`Login failed: ${response.message}`);
        }
      } catch (error) {
        console.log(error)
        setLoading(false);
        alert(error.error);
      } finally {
        setLoading(false);
        console.log('.....')
        
        setEmail(""), setPassword("");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center    ">
      <div className="bg-white backdrop-filter backdrop-blur-sm bg-opacity-40 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6  ">Login</h2>
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold ">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`mt-2 w-full p-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold ">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-2 w-full p-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {loading && (
            <div className="flex justify-center">
              <ClipLoader
                className=""
                eloading={loading}
                color="#1312f2"
                speedMultiplier={3}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 ${
                loading ? "bg-primary opacity-35" : "bg-primary"
              }  text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition`}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
