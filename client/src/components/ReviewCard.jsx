import React from "react";
import { Rating } from "@material-ui/lab";
import TimeAgo from "timeago-react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  reviewDeleteFail,
  reviewDeleteRequest,
  reviewDeleteSuccess,
} from "../reducers/tutorialDetails";
import { useAlert } from "react-alert";

const ReviewCard = ({ id, revId, name, rating, comment, date, image }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const options = {
    value: rating,
    readOnly: false,
    precision: 0.5,
  };

  const handleDeleteReview = async () => {
    try {
      dispatch(reviewDeleteRequest());

      const data = await axios.delete(`/api/v1/deleteReview/${id}?id=${revId}`);
      console.log(data);
      alert.success("Deleted Successfully");
      dispatch(reviewDeleteSuccess());
    } catch (error) {
      alert.error("You cannot delete others' review");
      dispatch(reviewDeleteFail(error.response.data.message));
    }
  };
  return (
    <div className="">
      <div className="flex items-end gap-3 w-full mt-2 border-black border-2 rounded-lg px-2">
        <img src={image} alt="img" className="rounded-full h-10 w-auto mb-3" />
        <div className="">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">@{name} </h1>
            <p className="text-slate-500 text-sm">
              <TimeAgo datetime={date} />
            </p>
            <div className="hover:cursor-pointer" onClick={handleDeleteReview}>
              <MdDelete size={20} />
            </div>
          </div>
          <div className="">
            <Rating {...options} />
            <p>{comment} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
