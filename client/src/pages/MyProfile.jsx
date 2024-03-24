import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../components/MyLoader";
import { useAlert } from "react-alert";
import {
    logoutFail,
    logoutRequest,
  logoutSuccess,
  updatePasswordSuccess,
  updateProfileFail,
  updateProfileRequest,
} from "../reducers/user";
import TimeAgo from "timeago-react";
import { Link } from "react-router-dom";

const uploadFile = async (imag) => {
  const data = new FormData();
  data.append("file", imag);
  data.append("upload_preset", "image_preset");

  try {
    let cloudName = "dfzsw9nsu";
    let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const res = await axios.post(api, data);
    const { secure_url } = res.data;
    console.log(secure_url);
    return secure_url;
  } catch (error) {
    console.log(error);
  }
};
const MyProfile = () => {
  const user = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState(null);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  console.log(userDetails)

  useEffect(() => {
    if (user.isAuthenticated) {
      setUserDetails(user.user.data.message); // Set user details from Redux state
      setImg(user.user.data.message.avatar.url);
    }
  }, [user.isAuthenticated, dispatch, img]);

  const handleResetPassword = async () => {
    
  };

  const handleImgUpdate = async (e) => {
    try {
      dispatch(updateProfileRequest());
      setLoading(true);
      const imgUrl = await uploadFile(e.target.files[0]);

      const { data } = await axios.put(`/api/v1/me`, {
        avatar: {
          public_id: 125,
          url: imgUrl,
        },
      });
      dispatch(updatePasswordSuccess(data));
      setImg(data.message.avatar.url);
      alert.success("Uploaded Successfully!");
      setLoading(false);
    } catch (error) {
      alert.error("Upload Fail, please try later!");
      dispatch(updateProfileFail(error.response.data.message));
    }
  };

  const handleLogout = async() => {
    try {
        dispatch(logoutRequest())
        const {data} = await axios.get(`/api/v1/logout`);
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail(error))
    }
  }

  return (
    <div className="flex items-center h-screen justify-evenly max-sm:flex-col pt-20 w-[100%]">
      {user.isAuthenticated && userDetails && (
        <>
          <div className=" hover:shadow-2xl p-4">
            {/* Profile Image (Left Half) */}
            <div className="m-3 roun bg-white w-auto border-4 border-slate-500 rounded-lg max-sm:px-8">
              <label
                htmlFor="fileinput"
                className="text-sm font-medium text-gray-600 cursor-pointer"
              >
                <div className="w-[30vh] h-[30vh] max-sm:w-full">
                  <img src={img} alt="Preview" className="w-[30vh] h-[30vh]" />
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                id="fileinput"
                multiple
                onChange={handleImgUpdate}
                className="hidden"
              />
              <div className="justify-center flex items-center">
                <p className="text-3xl">+</p>
                <p>update profile</p>
              </div>
            </div>
            {loading && <MyLoader />}
          </div>
          <div className="w-full md:w-1/2 p-4">
            {/* Profile Details (Right Half) */}
            <div className="text">
              <h1 className="text-3xl font-bold mb-4">{userDetails.name}</h1>
              <p className="text-gray-600 mb-4 text-xl font-semibold">
                {userDetails.email}
              </p>
              <p className="text-gray-600 mb-4 text-xl font-semibold">
                Role: {userDetails.role}
              </p>
              <p className="text-lg text-gray-500 mt-2">Joined:  <TimeAgo datetime={userDetails.createdAt} /></p>
              <p className="mt-10">
              <Link to='/updatePassword'
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleResetPassword}
              >
                Update Password
              </Link>
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
                onClick={handleLogout}
              >
                Logout
              </button>
              {/* My Courses Section */}
              {/* Add your My Courses section here */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProfile;
