import { React, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

const validationSchema = yup.object({
  emailAddress: yup
    .string()
    .email("Enter a valid Email format")
    .required("Email is required!"),
  firstname: yup
    .string()
    .min(3, "Must have First Name")
    .required("First Name is required!"),
  lastname: yup
    .string()
    .min(3, "Must have Last Name")
    .required("Last Name is required!"),
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 character")
    .required("Password is required!"),
  description: yup
    .string()
    .min(50, "Description must be at least 50 characters")
    .required("Description is required!"),
});

const Signup = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (values) => {
    const { ...data } = values;
    const response = await axios
      .post(process.env.NEXT_PUBLIC_API_URL + `Author/Register`, data)
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
        setSuccess(null);
      });

    if (response && response.data) {
      setError(null);
      setSuccess(response.data.message);
      formik.resetForm();
      router.push(`/verification`);
    }
  };

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      description: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-fixed bg-center bg-cover custom-login-img">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-600/40 ring-2 ring-blue-600 lg:max-w-xl">
        <div className="text-center font-bold">
          <span className="text-blue-500">Write</span>Mind
        </div>
        <form onSubmit={formik.handleSubmit}>
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
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="email"
              name="emailAddress"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emailAddress}
            />
            {formik.touched.emailAddress && formik.errors.emailAddress ? (
              <span className="inline-flex text-sm text-red-600">
                {formik.errors.emailAddress}
              </span>
            ) : null}
          </div>
          <div className="mb-2">
            <label
              htmlFor="firstname"
              className="block text-sm font-semibold text-gray-800"
            >
              First Name
            </label>

            <input
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
              name="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <span className="inline-flex text-sm text-red-600">
                {formik.errors.firstname}
              </span>
            ) : null}
          </div>
          <div className="mb-2">
            <label
              htmlFor="lastname"
              className="block text-sm font-semibold text-gray-800"
            >
              Last Name
            </label>

            <input
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <span className="inline-flex text-sm text-red-600">
                {formik.errors.lastname}
              </span>
            ) : null}
          </div>
          <div className="mt-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>

            <input
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <span className="inline-flex text-sm text-red-600">
                {formik.errors.username}
              </span>
            ) : null}
          </div>

          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>

            <input
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="inline-flex text-sm text-red-600">
                {formik.errors.password}
              </span>
            ) : null}
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-800"
            >
              Description
            </label>

            <textarea
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <span className="inline-flex text-sm text-red-600">
                {formik.errors.description}
              </span>
            ) : null}
          </div>

          <div className="flex items-center mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 text-grey-600">
          Already have an account?{" "}
          <span>
            <a className="text-blue-600 hover:underline" href="/signin">
              Log in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
