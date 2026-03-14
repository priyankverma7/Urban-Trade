import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signupSchema } from "../utils/ValidationSchema";

const SignUp = ({openLogin}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-full bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8">

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            number: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            dispatch(signup(values));
            dispatch(openLogin);
          }}
        >
          <Form className="space-y-6">

            {/* FIRST NAME */}
            <div className="relative">
              <Field
                name="firstName"
                placeholder="First Name"
                className="peer w-full px-3 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent"
              />
              <label className="absolute left-3 top-3 text-gray-500 text-sm transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                peer-[&:not(:placeholder-shown)]:-top-2
                peer-[&:not(:placeholder-shown)]:text-xs
                peer-[&:not(:placeholder-shown)]:text-blue-500">
                First Name
              </label>
              <ErrorMessage name="firstName" component="p" className="text-red-500 text-xs mt-1" />
            </div>

            {/* LAST NAME */}
            <div className="relative">
              <Field
                name="lastName"
                placeholder="Last Name"
                className="peer w-full px-3 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent"
              />
              <label className="absolute left-3 top-3 text-gray-500 text-sm transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                peer-[&:not(:placeholder-shown)]:-top-2
                peer-[&:not(:placeholder-shown)]:text-xs
                peer-[&:not(:placeholder-shown)]:text-blue-500">
                Last Name
              </label>
              <ErrorMessage name="lastName" component="p" className="text-red-500 text-xs mt-1" />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="peer w-full px-3 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent"
              />
              <label className="absolute left-3 top-3 text-gray-500 text-sm transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                peer-[&:not(:placeholder-shown)]:-top-2
                peer-[&:not(:placeholder-shown)]:text-xs
                peer-[&:not(:placeholder-shown)]:text-blue-500">
                Email
              </label>
              <ErrorMessage name="email" component="p" className="text-red-500 text-xs mt-1" />
            </div>

            {/* MOBILE */}
            <div className="relative">
              <Field
                name="number"
                placeholder="Mobile Number"
                className="peer w-full px-3 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent"
              />
              <label className="absolute left-3 top-3 text-gray-500 text-sm transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                peer-[&:not(:placeholder-shown)]:-top-2
                peer-[&:not(:placeholder-shown)]:text-xs
                peer-[&:not(:placeholder-shown)]:text-blue-500">
                Mobile Number
              </label>
              <ErrorMessage name="number" component="p" className="text-red-500 text-xs mt-1" />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="peer w-full px-3 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent pr-10"
              />
              <span
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <label className="absolute left-3 top-3 text-gray-500 text-sm transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                peer-[&:not(:placeholder-shown)]:-top-2
                peer-[&:not(:placeholder-shown)]:text-xs
                peer-[&:not(:placeholder-shown)]:text-blue-500">
                Password
              </label>
              <ErrorMessage name="password" component="p" className="text-red-500 text-xs mt-1" />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="peer w-full px-3 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-transparent pr-10"
              />
              <span
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <label className="absolute left-3 top-3 text-gray-500 text-sm transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                peer-[&:not(:placeholder-shown)]:-top-2
                peer-[&:not(:placeholder-shown)]:text-xs
                peer-[&:not(:placeholder-shown)]:text-blue-500">
                Confirm Password
              </label>
              <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              SIGN UP
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={openLogin}
              >
                Login
              </span>
            </p>

          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
