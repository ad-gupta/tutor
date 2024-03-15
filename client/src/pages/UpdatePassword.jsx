import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updatePasswordRequest, updatePasswordSuccess, updateProfileFail } from "../reducers/user";
import { useAlert } from "react-alert";

const UpdatePassword = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const alert = useAlert()

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    console.log(password);
    console.log(confirmPassword)
    try {
      dispatch(updatePasswordRequest());

      const {data} = await axios.put(
        `/api/v1/password/update`,
        { oldPassword: password, newPassword: confirmPassword },
      );
      console.log(data)
      alert.success("password updated successfully")
      dispatch(updatePasswordSuccess(data.success));
      navigate('/learn')
    } catch (error) {
      dispatch(
        updateProfileFail(error)
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Your Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handlePasswordUpdate}>
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 8a4 4 0 11-8 0 4 4 0 018 0zm-4-6a6 6 0 100 12h8a2 2 0 012 2v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a2 2 0 012-2h8a2 2 0 100-4H5a1 1 0 00-1 1v2h14v-2a1 1 0 00-1-1H3a1 1 0 00-1 1v2a2 2 0 002 2h8a2 2 0 110 4H5a4 4 0 110-8h10a1 1 0 100-2H5a6 6 0 000 12h10a4 4 0 100-8H6a2 2 0 01-2-2V4a2 2 0 012-2h8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
