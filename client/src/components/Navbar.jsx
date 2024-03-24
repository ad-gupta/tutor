import React, { useEffect, useState } from "react";
import { TbMenuDeep } from "react-icons/tb";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [user, setUser] = useState(null); // Initialize user state with null
  const [keyword, setKeyword] = useState("");
  const alert = useAlert();
  const isAuth = useSelector((state) => state.user.isAuthenticated); // Removed useState wrapper
  const userData = useSelector((state) => state.user.user); // Moved user data extraction here
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/learn/${keyword}`);
    } else {
      navigate(`learn`);
    }
  };
  useEffect(() => {
    // Set user only if isAuthenticated is true
    if (isAuth) {
      setUser(userData);
    } else {
      navigate('/login')
      setUser(null); // Reset user state if not authenticated
    }
  }, [isAuth, userData]); // Added userData dependency

  const handleClick = () => {
    setActiveMenu(!activeMenu);
  };
  // console.log(user.data.message.avatar.url)
  console.log(isAuth)


  return (
    <div className="flex items-center justify-between fixed w-full max-sm:h-20 ">
      <Link to="/">
        <img
          src="./logo.jpeg"
          alt="Smart Tutor"
          className="h-16 rounded-full m-5  bg-white max-sm:hidden"
        />
      </Link>
      <div className="">
        <form
          className="flex items-center bg-gray-100 rounded-lg p-2 lg:w-[50vh]"
          onSubmit={searchSubmitHandler}
        >
          <input
            className="max-sm:p-1 p-2 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 lg:w-[50vh]"
            type="text"
            placeholder="Search a Tutorial..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-700 text-white max-sm:p-2 p-3 rounded-r-md"
          >
            <CiSearch size={17} />
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center gap-5 max-sm:gap-0">
        <div className="">
        {isAuth ? (
          <Link to="/me">
            {user &&
              user.data &&
              user.data.message &&
              user.data.message.avatar.url && (
                <img
                  src={user.data.message.avatar.url}
                  alt="avatar"
                  className="h-8 w-8 rounded-full max-sm:w-10"
                />
              )}
          </Link>
        ) : (
          <Link to='/login'>
            <CgProfile size={40} color="blue" />
          </Link>
        )}
        </div>
        <div className="" onClick={handleClick}>
          <TbMenuDeep size={40} color="blue" />
          {activeMenu && <Sidebar />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
