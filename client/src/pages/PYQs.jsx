import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearErrors,
  getPaperFail,
  getPaperRequest,
  getPaperSuccess,
} from "../reducers/paper";
import axios from "axios";
import MyLoader from "../components/MyLoader";
import PaperCard from "../components/PaperCard.jsx";
import { Slider } from "@material-ui/core";

const categories = [
  "Primary",
  "High School",
  "Intermediate",
  "graduation",
  "Post Graduate",
];

const getPapers = async (
  dispatch,
  keyword = "",
  currentPage = 1,
  price = [0, 100],
  category
) => {
  try {
    dispatch(getPaperRequest());

    let link = `/api/v1/getPapers?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

    if (category) {
      link = `/api/v1/getPapers?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
    }

    const { data } = await axios.get(link);

    dispatch(getPaperSuccess(data));
  } catch (error) {
    dispatch(getPaperFail(error.response.data.message));
    dispatch(clearErrors());
  }
};

const PYQs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100]);
  const [category, setCategory] = useState("");
  const [loading, setloading] = useState(false);

  const { keyword } = useParams();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { papers, error, resultperpage, filteredpaperCount } = useSelector(
    (state) => state.paper
  );
  useEffect(() => {
    setloading(true);
    getPapers(dispatch, keyword, currentPage, price, category);
    setloading(false);
  }, [keyword, dispatch, currentPage, price, category]);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  console.log(papers.paper);
  return (
    <div className="pt-28">
      {loading ? (
        <MyLoader />
      ) : (
        <div>
          <div className="flex items-center justify-between mx-5">
            <h1 className="text-3xl py-3">Get latest PYQs</h1>
            <div className="">
              <Link to="/upload/pyq">
                <p className="bg-blue-700 text-slate-50 rounded-md p-2 hover:bg-blue-400">
                  Upload PYQs and Earn
                </p>
              </Link>
            </div>
          </div>
          <div className="flex">
            <div className="w-[25%]">
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
              </div>
            </div>
            <div className="w-[70%]">
              <div className="flex flex-wrap gap-5">
                {papers.paper &&
                  papers.paper.map((pyq) => (
                    <PaperCard
                      link={pyq.file}
                      name={pyq.title}
                      price={pyq.price}
                      year={pyq.year}
                      category={pyq.category}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PYQs;
