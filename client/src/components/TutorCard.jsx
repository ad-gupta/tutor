import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from "@material-ui/lab";
import TimeAgo from 'timeago-react';

const TutorCard = ({name, id, price, title, ratings, numOfReviews, image, createdAt }) => {
  const options = {
    value: ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link to={`learn/${id}`} className="block w-[50vh] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img className="w-full h-48 object-cover object-center" src={image} alt="https://news.stonybrook.edu/wp-content/uploads/2023/10/Professor-Derek-Teaney-e1698068548214.jpg" />
      <div className="p-4">
        <p className="text-xl font-semibold mb-1">{name}</p>
        <p className="text-gray-600 mb-1">{title}</p>
        <div className="flex items-center mb-1">
          <Rating {...options} />
          <span className="text-gray-600 ml-2">({numOfReviews})</span>
        </div>
        <p className="text-lg font-bold">{`₹${price}`}</p>
        <p className="text-sm text-gray-500 mt-2">Uploaded: <TimeAgo datetime={createdAt} /></p>
      </div>
    </Link>
  );
}

export default TutorCard;
