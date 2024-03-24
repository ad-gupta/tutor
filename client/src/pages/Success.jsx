import React from 'react';

const Success = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-3xl text-center font-bold text-gray-800 mb-4">Payment Successful!</h2>
        <p className="text-lg text-gray-700 mb-8">Thank you for buying this course</p>
        <img src="https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png" alt="Success" className="mx-auto mb-8 h-28" />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400 w-full">
          Continue To Other Courses
        </button>
      </div>
    </div>
  );
};

export default Success;
