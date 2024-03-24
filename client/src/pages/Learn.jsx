import React, { useEffect, useState } from "react";
import TutorCard from "../components/TutorCard";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@mui/material";
import Pagination from "react-js-pagination";
import { clearErrors } from "../reducers/user";
import "./Learn.css";
import {
  tutorialFail,
  tutorialRequest,
  tutorialSuccess,
} from "../reducers/tutor";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

const categories = [
  "Primary",
  "High School",
  "Intermediate",
  "graduation",
  "Post Graduate",
];

const getProducts = async (
  dispatch,
  keyword = "",
  currentPage = 1,
  price = [0, 2000],
  category,
  ratings = 0
) => {
  try {
    dispatch(tutorialRequest());

    let link = `/api/v1/getCourse?keyword=${keyword}&page=${currentPage}&fee[gte]=${price[0]}&fee[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      link = `/api/v1/getCourse?keyword=${keyword}&page=${currentPage}&fee[gte]=${price[0]}&fee[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }

    const { data } = await axios.get(link);
    console.log(data)

    dispatch(tutorialSuccess(data));
  } catch (error) {
    dispatch(tutorialFail(error.response.data.message));
  }
};

const Learn = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [loading, setloading] = useState(false)

  const { keyword } = useParams();

  const dispatch = useDispatch();
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const {
    tutorials,
    error,
    courseCount,
    resultperpage,
    filteredTutorialsCount,
  } = useSelector((state) => state.tutor);

  useEffect(() => {
    setloading(true);
    if(error) alert.error(error)
    getProducts(dispatch, keyword, currentPage, price, category, ratings);
    setloading(false)
  }, [keyword, dispatch, currentPage, price, category, ratings]);
  let count = filteredTutorialsCount;
  return (
    <div className="min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div className="pt-28 flex justify-center max-sm:flex-col max-sm:mb-10">
          {/* filter box */}

          <div className="bg-white w-64 ml-5 max-h-[70vh] p-5 rounded-md max-sm:mb-8 text-center max-sm:w-[90%] max-sm:px-7 pb-5">
            {/* Your filter box content */}
            <p className="">Price</p>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={2000}
            />

            <p className="mt-5">Category</p>
            <ul className="">
              {categories.map((category) => (
                <li
                  className="bg-slate-100 mb-1 hover:cursor-pointer text-slate-700"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <p className="mt-10"> Ratings above</p>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          <div className="w-[80%] max-lg:w-[100%]">
            <div className="flex flex-wrap items-center justify-center gap-10">
              {tutorials &&
                tutorials.map((tutor) => (
                  <TutorCard
                    key={tutor._id}
                    id = {tutor._id}
                    name={tutor.tutor}
                    title={tutor.title}
                    ratings={tutor.ratings}
                    price={tutor.fee}
                    numOfReviews={tutor.numOfReviews}
                    image={tutor.image}
                    createdAt={tutor.createdAt}
                  />
                ))}
            </div>
            <div className="">
              {resultperpage <= count && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultperpage}
                    totalItemsCount={courseCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;
