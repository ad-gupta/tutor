import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex items-center justify-evenly bg-blue-900 p-8 text-slate-300 min-h-[40vh] max-sm:flex-col-reverse">
      <div className="flex items-center gap-8 max-lg:flex-col">
        <div className="">
          <h4 className="font-semibold text-lg">DOWNLOAD OUR APP</h4>
          <p className="text-sm">
            Download App for Android and IOS mobile phone
          </p>
        </div>
        <div className="">
          <img src="./playstore1.png" alt="playstore" className="w-32" />
          <img
            src="./apple_appstore.png"
            alt="Appstore"
            className="w-32 mt-[-2rem]"
          />
        </div>
      </div>

      <div className="flex items-center gap-8 max-lg:flex-col">
        <div className="">
          <Link
            to="/contact"
            className="text-slate-300 underline font-bold text-2xl"
          >
            {" "}
            Contact us
          </Link>
          <h1 className="font-bold text-lg mt-3">SMART TUTOR</h1>
          <p className="text-sm mb-4">High Quality is our first priority</p>
        </div>
        <div className="">
          <div className=" text-slate-300 text-center">
            <a href="https://www.linkedin.com/in/awadheshguptaofficial/">
              <LinkedInIcon />
            </a>
            <a href="https://github.com/ad-gupta" className="px-8">
              <GitHubIcon />{" "}
            </a>
          </div>
          <p className="text-slate-300 ">
            <a href="mailto:awadheshgupta.official@gmail.com?subject=Subject%20Here&body=Body%20Here">
              awadheshgupta.official@gmail.com
            </a>
          </p>
          <p>Copyrights 2024 &copy; team Smart Tutor</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
