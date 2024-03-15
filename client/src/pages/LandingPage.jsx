import React from "react";
import SecondPage from "./SecondPage";
import {Link} from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='h-[182vh] max-sm:h-[380vh] m-0 p-0'>
      <div className="m-5 mt-3 bg-white h-[80vh] rounded-xl max-sm:h-[140vh]">
        <div className="flex items-center justify-evenly max-sm:flex-col-reverse">
          <div className="w-[50%] p-5 max-lg:w-[80%]">
            <h1 className="text-5xl font-bold py-3">Lessions and insights</h1>
            <h1 className="text-4xl font-semibold text-blue-700 py-3">
              believe in learning
            </h1>

            <p className="">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
              architecto magnam nesciunt, laborum numquam magni repellendus quae
              eius temporibus saepe.
            </p>
            <button className="font-semibold bg-blue-700 text-white p-2 rounded-md px-5 my-4 text-xl">
              <Link to='/learn'> Visit Courses</Link>
            </button>
          </div>
          <div className="">
            <img
              src="./poster.jpeg"
              alt="Poster"
              className="h-[70vh] my-10 max-sm:h-[50vh]"
            />
          </div>
        </div>
      </div>
      <SecondPage />
    </div>
  );
};

export default LandingPage;
