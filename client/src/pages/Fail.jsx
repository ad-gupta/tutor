import React from 'react';

const Fail = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-3xl text-center font-bold text-gray-800 mb-4">Payment fail!</h2>
        <img src="https://miro.medium.com/v2/resize:fit:810/1*OkeqV425CNZUQT2HSkTnJA.png" alt="Success" className="mx-auto mb-8 h-28" />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400 w-full">
          Continue To Course
        </button>
      </div>
    </div>
  );
};

export default Fail;
