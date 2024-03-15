import React from "react";

const Loader = () => {
  return (
    <div className="loading bg-white grid place-items-center w-screen h-screen max-w-full">
      <div className="w-24 h-24 border-b-4 border-black animate-spin rounded-full"></div>
    </div>
  );
};

export default Loader;
