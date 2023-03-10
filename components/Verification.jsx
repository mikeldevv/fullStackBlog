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
  token: yup.string().min(6).required("Please enter valid token!"),
});

const Verification = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (values) => {
    const { ...data } = values;
    const response = await axios
      .patch(
        process.env.NEXT_PUBLIC_API_URL +
          `Author/VerifyUser?` +
          new URLSearchParams(data).toString(),
        data
      )
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
        setSuccess(null);
      });

    if (response && response.data) {
      setError(null);
      setSuccess(response.data.message);
      formik.resetForm();
      router.push(`/signin`);
    }
  };
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      token: "",
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
          Please verify your account
        </h2>
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
              htmlFor="token"
              className="block text-sm font-semibold text-gray-800"
            >
              Token
            </label>
            <input
              type="text"
              name="token"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.token}
              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {formik.touched.token && formik.errors.token ? (
              <span className="inline-flex text-sm text-red-600">
                {formik.errors.token}
              </span>
            ) : null}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
