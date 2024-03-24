import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useAlert } from "react-alert";
import { MdOutlineDomainVerification } from "react-icons/md";

const CartItemsCard = ({ cartItems }) => {
  const [toDelete, setToDelete] = useState(false);
  const alert = useAlert();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `/api/v1/myOrders/delete/${cartItems.tutorialId}`
      );
      alert.success(data.message);
      setToDelete(false);
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  const handleNo = () => {
    setToDelete(false);
  };

  const makeSureDelete = () => {
    setToDelete(!toDelete);
  };
  return (
    <div className="rounded bg-white m-1 flex p-1">
      <div className="flex items-center h-72 gap-3">
        <div className="w-[30vw] lg:ml-10">
          <img
            className="w-64 h-52 rounded-lg border-slate-300 border-b-4 border-r-4"
            src={cartItems.image}
            alt={cartItems.name}
          />
        </div>
        <div className="w-[50%]">
          <Link to={`/learn/learn/${cartItems._id}`}>
            <h1 className="font-bold text-4xl mb-2 text-blue-800">
              {cartItems.name}
            </h1>
          </Link>
          <h1 className="font-semibold text-2xl my-1">
            Fee: ₹ {cartItems.price}
          </h1>

          <div className="">
            <ul className="m-1 text-xs">
              5 reasons, you should buy this course.
              <li className="flex items-center gap-1">
                {" "}
                <MdOutlineDomainVerification color="green" /> <p>
                  {" "}
                  One-to-one Mentorship
                </p>{" "}
              </li>
              <li className="flex items-center gap-1">
                {" "}
                <MdOutlineDomainVerification color="green" /> <p>
                  Instant Doubt resolve{" "}
                </p>{" "}
              </li>
              <li className="flex items-center gap-1">
                {" "}
                <MdOutlineDomainVerification  color="green"/>{" "}
                <p> Previous Year Exam Papers</p>{" "}
              </li>
              <li className="flex items-center gap-1">
                {" "}
                <MdOutlineDomainVerification  color="green"/>{" "}
                <p>Experienced and qualified teachers </p>{" "}
              </li>
              <li className="flex items-center gap-1">
                {" "}
                <MdOutlineDomainVerification color="green" /> <p>
                  {" "}
                  Very Affordable Price
                </p>{" "}
              </li>
            </ul>
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
      </div>
    </div>
  );
};

export default CartItemsCard;
