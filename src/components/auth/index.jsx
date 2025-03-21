import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/nutrack2.png";
import { useDispatch } from "react-redux";
import { LoginSuccess } from "../../redux/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const notifySuccess = (message) =>
  //   toast.success(message, { autoClose: 2000 });
  // const notifyError = (message) => toast.error(message, { autoClose: 2000 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
  const token = urlParams.get("token");
  console.log(token)
  useEffect(() => {
    const verifyToken = async () => {
      if (urlParams.size) {
        try {
          const response = await axios.get("https://nubit-soft.vercel.app/user/verifyToken", {
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
              console.log('ya client role ha', response);

              const obj = {
                email: "wk@gmail.com",
                password: "123456",
              };
              dispatch(LoginSuccess(response.data.data));
              navigate("/");
            } else if (response.data.data.role === "HR") {
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

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("https://nubit-soft.vercel.app/user/login", values, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status) {
        dispatch(LoginSuccess(response.data.data));
        navigate("/");
        toast.success(response.data.message, { autoClose: 2000 });
      } else {
        toast.error(response.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen h-full flex sm:items-center  md:justify-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://media.istockphoto.com/id/1391730574/vector/light-sky-blue-and-faded-white-coloured-ombre-rustic-and-smudged-painted-plastered-scratched.jpg?s=612x612&w=0&k=20&c=0UzbHPlW4Tjor2v9Lont1XJmacbm7uUljglrSENFU3I=')" }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-md"></div>

      <div className="bg-white/10 backdrop-blur-xl md:shadow-2xl rounded-lg md:p-8 flex flex-col md:flex-row items-center max-w-4xl w-full relative z-10">
        {/* SVG Illustration */}
        <div className="w-2/3 md:w-1/2">
          <img
            src={logo}
            alt="Login Illustration"
            className="w-full h-full rounded-l-lg"
          />
        </div>
        {/* Login Form */}
        <div className="md:w-1/2 w-full px-4">
          <h2 className="text-3xl sm:text-5xl   font-bold text-[#636E8E] text-center mb-8"
          >
            Login
          </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6 ">
                <div>
                  <label className="block text-gray-600">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"

                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="relative">
                  <label className="block text-gray-600">Password</label>
                  <Field
                    placeholder="Enter Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-9 text-gray-600"
                  >
                    {showPassword ? "👁" : "🙈"  }
                  </button>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 md:py-2 mt-12 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
