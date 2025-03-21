import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/nutrack2.png";
import { useDispatch } from "react-redux";
import { LoginSuccess } from "../../redux/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const notifySuccess = (message) =>
    toast.success(message, { autoClose: 2000 });
  const notifyError = (message) => toast.error(message, { autoClose: 2000 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
  const token = urlParams.get("token");
  console.log(token)
  useEffect(() => {
    const verifyToken = async () => {
      if(urlParams.size){
        try {
          const response = await axios.get("https://nubit-soft.vercel.app/user/verifyToken",{
          // const response = await axios.get("http://localhost:3002/user/verifyToken",{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          console.log(response)
        if (response.data.status) {
          console.log(response)
          if (response.data.data.role === "Client") {
            console.log('ya client role ha',response);
            
            const obj = {
              email: "wk@gmail.com",
              password: "123456",
            };
            dispatch(LoginSuccess(response.data.data));
            navigate("/");
          }else if(response.data.data.role === "HR") {
            console.log(response)
            const obj = {
              email: "hr@gmail.com",
              password: "101171",
            };
            dispatch(LoginSuccess(response.data.data));
            navigate("/");
          }
        }
        } catch (error) {
            console.log(error.response.data.data)
        }
      }
    };
    verifyToken();
  }, [token]);
  const handleLogin = async (e) => {
    e.preventDefault();

    const obj = {
      email,
      password,
    };
    console.log(obj)
    if(obj.email == ""|| obj.password == "" ){
      notifyError("Invalid Credential");
    }
    else {
      try {
        const response = await axios.post(
          "https://nubit-soft.vercel.app/user/login",
          obj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response",response)
        if (response.status) {
          console.log(response)
          dispatch(LoginSuccess(response.data.data));
          navigate("/");
          notifySuccess(response.data.message);
          
        }else{
          notifyError(response.data.message);
        }
      } catch (error ) {
        console.log(error.message);
        
        notifyError(error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  return (
    <div className="min-h-screen flex items-center -mt-10 md:-mt-0 md:justify-center relative overflow-hidden bg-cover bg-center" 
    style={{ backgroundImage: "url('https://media.istockphoto.com/id/1391730574/vector/light-sky-blue-and-faded-white-coloured-ombre-rustic-and-smudged-painted-plastered-scratched.jpg?s=612x612&w=0&k=20&c=0UzbHPlW4Tjor2v9Lont1XJmacbm7uUljglrSENFU3I=')" }}
    >
     <div className="absolute inset-0 bg-black/10 backdrop-blur-md"></div>

      <div className="bg-white/10 backdrop-blur-xl md:shadow-2xl rounded-lg md:p-8 flex flex-col md:flex-row items-center max-w-4xl w-full relative z-10">
        {/* SVG Illustration */}
        <div className="md:w-1/2">
          <img
            src={logo}
            alt="Login Illustration"
            className="w-full h-full rounded-l-lg"
          />
        </div>
        {/* Login Form */}
        <div className="md:w-1/2 w-full px-4">
          <h2 className="text-xl sm:text-5xl   font-bold text-[#636E8E] text-center mb-8"
          >
            Login
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                className="block text-[#636E8E] text-sm md:text-lg font-semibold mb-2"
                htmlFor="email"
              >
                 Email
              </label>
              <input
                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                type="text"
                id="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label
                className="block text-[#636E8E] text-sm md:text-lg font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                type={showPassword ? "text" : "password"} // Toggle input type
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Toggle Password Visibility Button */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 md:top-12 text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
