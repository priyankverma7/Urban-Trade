import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login, clearRedirectAfterLogin } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { loginSchema } from "../utils/ValidationSchema";

const Login = ({ openSignup, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.auth.users);
  const redirectUrl = useSelector(
    (state) => state.auth.redirectAfterLogin
  );

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-full bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8">

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            const foundUser = users.find(
              (u) =>
                u.email === values.email &&
                u.password === values.password
            );

            if (foundUser) {
              dispatch(login(foundUser));
              toast.success("Login Successful");
              onClose(); // close modal

              // ✅ STRIPE REDIRECT (CORRECT)
              if (redirectUrl) {
                dispatch(clearRedirectAfterLogin());
                window.location.href = redirectUrl;
                return;
              }

              navigate("/", { replace: true });
            } else {
              toast.error("Invalid Email or Password");
            }
          }}
        >
          <Form className="space-y-6">

            {/* EMAIL */}
            <div className="relative">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="peer w-full px-3 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent"
              />
              <label className="
              absolute left-3 top-3
               text-gray-500 
               text-sm transition-all
                peer-focus:-top-2
                 peer-focus:text-xs
                  peer-focus:text-blue-500
                   bg-white px-1 
                   peer-placeholder-shown:top-3
                    peer-placeholder-shown:text-sm
                    peer-[&:not(:placeholder-shown)]:-top-2
                  peer-[&:not(:placeholder-shown)]:text-xs
                 peer-[&:not(:placeholder-shown)]:text-blue-500
                    ">
                Email
              </label>
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-500 text-xs"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="peer w-full px-3 py-3 border 
                rounded-lg outline-none focus:ring-2
                 focus:ring-blue-400 placeholder-transparent pr-10"
              />
              <span
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <label className="absolute left-3 top-3 text-gray-500
               text-sm transition-all peer-focus:-top-2 peer-focus:text-xs
                peer-focus:text-blue-500 bg-white px-1
                 peer-placeholder-shown:top-3 
                 peer-placeholder-shown:text-sm
                  peer-[&:not(:placeholder-shown)]:-top-2
                  peer-[&:not(:placeholder-shown)]:text-xs
                 peer-[&:not(:placeholder-shown)]:text-blue-500
                 ">
                Password
              </label>
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              LOGIN
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={openSignup}
              >
                Sign Up
              </span>
            </p>

          </Form>
        </Formik>

      </div>
    </div>
  );
};

export default Login;
