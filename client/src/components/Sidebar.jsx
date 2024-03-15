import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-slate-100 h-100 w-64 rounded absolute top-10 right-5 text-yellow-900">
      <div className="p-5">
        <CloseIcon className="float-right text-red-700" />
      </div>

      <div className="p-5">
        <ul className="text-xl text-yellow-900">
          <li className="pl-7 justify-center font-semibold hover:bg-slate-200 rounded p-1">
            <Link to="/learn">Learn</Link>
          </li>
          <li className="pl-7 justify-center font-semibold hover:bg-slate-200 rounded p-1">
            <Link to="/pyqs">PYQs</Link>
          </li>
          <li className="pl-7 justify-center font-semibold hover:bg-slate-200 rounded p-1">
            <Link to="/mycourses">My Courses</Link>
          </li>
          <li className="pl-7 justify-center font-semibold hover:bg-slate-200 rounded p-1">
            <Link to="/join">Join as a tutor</Link>
          </li>
          <li className="pl-7 justify-center font-semibold hover:bg-slate-200 rounded p-1">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="pl-7 justify-center font-semibold hover:bg-slate-200 rounded p-1">
            <Link to="/mytutors">My tutors</Link>
          </li>
        </ul>
        <div className="pl-7 mt-10">
          <h1 className="font-bold text-slate-300 text-2xl">SAY HELLO</h1>
          <a
            href="https://t.me/ad_gupta1"
            className="text-xl p-1 font-semibold hover:bg-slate-200 rounded"
          >
            t.me/ad_gupta
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
