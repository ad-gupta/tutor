import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reviewAddFail,
  reviewAddRequest,
  reviewAddSuccess,
  tutorialDetailsFail,
  tutorialDetailsRequest,
  tutorialDetailsSuccess,
} from "../reducers/tutorialDetails";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { useAlert } from "react-alert";
import { Rating } from "@material-ui/lab";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { addToCartFail, addToCartReq, addToCartSuccess } from "../reducers/order";

const getProductDetails = async (dispatch, id) => {
  try {
    dispatch(tutorialDetailsRequest());

    const detail = await axios.get(`/api/v1/getCourseDetails/${id}`);

    dispatch(tutorialDetailsSuccess(detail.data));
    return detail.data;
  } catch (error) {
    dispatch(tutorialDetailsFail(error.response.data.message));
  }
};

const addToCart = async (dispatch, id, alert) => {
  try {
    dispatch(addToCartReq())
    const {data} = await axios.post(`/api/v1/addToCart/${id}`);
    console.log(data)
    dispatch(addToCartSuccess(data));
    // console.log(data)
    alert.success("added to cart")
  } catch (error) {
    alert.error("order not added to cart")
    dispatch(addToCartFail(error.response.data.message))
  }
}

const TutorialDetails = () => {
  const [tutorial, setTutorial] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const {isAuthenticated} = useSelector(state => state.user)

  useEffect(() => {
    getProductDetails(dispatch, id)
      .then((data) => setTutorial(data.message))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [dispatch, id]);

  const handleReviewAdd = async (e) => {
    e.preventDefault();
    try {
      if(!isAuthenticated) {
        alert.error("Login first")
        return;
      }
      dispatch(reviewAddRequest());
      const rev = {
        rating,
        comment,
      };

      const { data } = await axios.post(`/api/v1/rate/${id}`, rev);
      alert.success("Review Added");
      dispatch(reviewAddSuccess());
    } catch (error) {
      alert.error("Something went wrong");
      dispatch(reviewAddFail());
    }
  };

  const handleAddToCart = () => {
    addToCart(dispatch, id, alert);
  }
  const options = {
    value: rating,
    readOnly: false,
    precision: 0.5,
    name: comment,
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000,
    cssEase: "linear",
  };

  return (
    <div className="flex justify-evenly pt-28 max-sm:flex-col">
      {/* Left side (Image and Video) */}
      <div className="lg:w-[35%] lg:h-[80vh] p-5 bg-orange-200">
        <Slider {...settings}>
          <div className="">
            <img
              src={tutorial.image}
              alt="Course"
              className="mb-10 lg:h-[60vh] lg:w-[40vw] max-sm:h-[62vh] max-sm:w-full rounded-lg"
            />
          </div>
          <div className="">
            {tutorial.video !== "sample video" ? (
              <iframe
                title="Video"
                src={tutorial.video}
                allowFullScreen // Corrected attribute name
                className="h-[60vh] w-[33vw] max-sm:h-[62vh] max-sm:w-full rounded-lg"
              ></iframe>
            ) : (
              <img
                src='/video_upload.jpg'
                alt="Course"
                className="mb-10 lg:h-[60vh] lg:w-[40vw] max-sm:h-[62vh] max-sm:w-full rounded-lg"
              />
            )}
          </div>
        </Slider>
      </div>

      <div className="p-4">
        <h2 className="text-5xl font-bold mb-4">{tutorial.title}</h2>
        <p className="text-lg mb-2">Tutor: {tutorial.tutor}</p>
        <p className="text-lg mb-2">Fee: ₹{tutorial.fee}</p>
        <p className="text-lg mb-2">
          Description:
          <br /> {tutorial.description}
        </p>

        <Link to={isAuthenticated ? `/myOrders` : '/login'}>
          <button onClick={handleAddToCart} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-10">
            Buy Now
          </button>
        </Link>

        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Reviews</h3>
          <div className="">
            {tutorial.reviews &&
              tutorial.reviews.map((review) => (
                <ReviewCard
                  id={tutorial._id}
                  revId={review._id}
                  name={review.name}
                  rating={review.rating}
                  comment={review.comment}
                  date={review.commentedAt}
                  image={review.image}
                />
              ))}
          </div>

          <form className="mt-4" onSubmit={handleReviewAdd}>
            <Rating
              {...options}
              onChange={(e) => setRating(parseInt(e.target.value))}
            />
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              placeholder="Write your review"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetails;
