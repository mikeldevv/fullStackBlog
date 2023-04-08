import { React, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";

const validationSchema = yup.object({
  emailAddress: yup
    .string()
    .email("Enter a valid Email format")
    .required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 character")
    .required("Password is required!"),
});

const Signin = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (values) => {
    const { ...data } = values;

    try {
      const response = await axios.post("/api/sessions", data);
      if (response?.data) {
        setError(null);
        await router.push("/private");
      }
    } catch (error) {
      if (error && error.response) setError(error.response.data.message);
      setSuccess(null);
    }
  };

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-fixed bg-center bg-cover custom-login-img">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-600/40 ring-2 ring-blue-600 lg:max-w-xl">
        <div className="text-left font-bold">
          <span className="text-blue-500">Write</span>Mind
        </div>
        <h2 className="text-3xl font-bold text-center text-blue-500  ">
          Sign in to Account
        </h2>
        <div className="flex justify-center my-2">
          <a
            href="#"
            className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-blue-500 hover:text-white"
          >
            <FaFacebookF className="text-sm" />
          </a>
          <a
            href="#"
            className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-blue-500 hover:text-white"
          >
            <FaLinkedinIn className="text-sm" />
          </a>
          <a
            href="#"
            className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-blue-500 hover:text-white"
          >
            <FaGoogle className="text-sm" />
          </a>
        </div>
        <p className="text-gray-400 my-3 text-center">
          or use your email account
        </p>

        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="mb-2 text-center font-semibold">
            {!error && success ? (
              <span className="inline-flex  text-sm text-green-600">
                {success}
              </span>
            ) : (
              ""
            )}

            {!success && error ? (
              <span className="inline-flex  text-sm text-red-600">{error}</span>
            ) : (
              ""
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="emailAddress"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>

            <input
              type="email"
              name="emailAddress"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emailAddress}
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {formik.touched.emailAddress && formik.errors.emailAddress ? (
              <span className="inline-flex text-sm text-red-600">
                {formik.errors.emailAddress}
              </span>
            ) : null}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="inline-flex text-sm text-red-600">
                {formik.errors.password}
              </span>
            ) : null}
          </div>
          <div className="flex justify-between w-full mb-5">
            <label className="flex  text-blue-600 text-xs hover:underline">
              <input type="checkbox" name="remember" className="mr-1" />
              Remember me
            </label>
            <a href="#" className="text-xs text-blue-600 hover:underline">
              Forget Password?
            </a>
          </div>

          <div type="submit" className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don&#39;t have an account?
          <a href="signup" className="font-medium text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
