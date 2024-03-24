import React, { useState } from "react";
import TimeAgo from "timeago-react";
import { IoIosArrowDropdown } from "react-icons/io";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { delCourseFail, delCourseRequest, delCourseSuccess } from "../reducers/myCourses";
import axios from "axios";
import { useAlert } from "react-alert";
import UpdateCourse from "../pages/UpdateCourse";

const CourseCard = ({ course }) => {
  const [review, setReview] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert()
  const handleReview = () => {
    setReview(!review);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(delCourseRequest());

        const {data} = await axios.delete(`/api/v1/deleteMyCourse/${course._id}`);
        console.log(data)
        alert.success(data.message)
        dispatch(delCourseSuccess(course._id))
        setToDelete(false);
    } catch (error) {
        alert.error(error.response.data.message)
        dispatch(delCourseFail(error.response.data.message))
    }
  }

  const handleEdit = () => {
    setToEdit(!toEdit)
    navigate('/')
  }

  const handleNo = () => {
    setToDelete(false)
    setToEdit(false)
  }

  const makeSureDelete = () => {
    setToDelete(!toDelete);
  };
  console.log(toDelete)
  return (
    <div className="rounded bg-white m-1 flex">
      <div className="flex w-[95%] items-center h-72">
        <div className="w-[40%] lg:ml-10">
          <img
            className="w-64 h-52 max-sm:w-40 max-sm:h-40 rounded-lg border-slate-300 border-b-4 border-r-4"
            src={course.image}
            alt={course.title}
          />
        </div>
        <div className="w-[50%]">
          <Link to={`/learn/learn/${course._id}`}>
            <h1 className="font-bold text-4xl mb-2 text-blue-800">
              {course.title}
            </h1>
          </Link>
          <h1 className="font-semibold text-2xl my-1">Fee: ₹ {course.fee}</h1>
          <h1 className="text-xl text-slate-500 my-1">
            Category: {course.category}
          </h1>
          <div className="text-slate-400 my-1">
            Uploaded: <TimeAgo datetime={course.createdAt} />
          </div>
          <div className="flex items-center gap-5 my-2">
            <p>Reviews: {course.numOfReviews} | Watch Reviews</p>
            <p className="cursor-pointer" onClick={handleReview}>
              <IoIosArrowDropdown size={22} />
            </p>
          </div>
          <div className="absolute">
            {review &&
              course.reviews.map((rev) => (
                <ReviewCard
                  id={course._id}
                  revId={rev._id}
                  name={rev.name}
                  rating={rev.rating}
                  comment={rev.comment}
                  date={rev.commentedAt}
                  image={rev.image}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="" onClick={makeSureDelete}>
          <MdDelete size={28} className="text-red-600" />
          {toDelete && (
            <div className="absolute ml-[-20vh] bg-white p-4 rounded shadow-lg">
              <div>
                <p>Are You Sure?</p>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
                    onClick={handleNo}
                  >
                    NO
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                  >
                    YES
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <FaEdit size={24} className="mt-3 text-slate-400" onClick={() => setToEdit(!toEdit)}/>
        {toEdit && (
            <div className="absolute ml-[-20vh] bg-white p-4 rounded shadow-lg">
              <div>
                <p>Are You Sure?</p>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
                    onClick={handleNo}
                  >
                    NO
                  </button>
                  <Link to={`/editTutorial/${course._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    YES
                  </Link>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default CourseCard;
