import React, { useState } from "react";

const PaperCard = ({ name, link, price, year, category }) => {
    // const [pdfFile, setPdfFile] = useState("")
    // const showPdf = (pdf) => {
    //     window.open(`http://localhost:8000/files/${pdf}`, "_blank", "noreferrer")
    //     setPdfFile(`http://localhost:8000/files/${pdf}`)
    // }

    const showPdf = () => {
        window.open(link)
    }
  return (
    <div className="w-80 h-80 bg-white shadow-lg rounded-lg overflow-hidden" onClick={showPdf}>
      <img src="./pdf.png" alt="pdf" className="w-full h-40 object-cover" />
      <div className="p-4 text-center">
        <p className="text-2xl font-bold mb-2 text-center text-blue-600">
          {name}
        </p>
        <p className="text-gray-700 mb-2 font-semibold text-xl">
          Price: ₹  {price}
        </p>
        <div className="flex justify-evenly items-center">
          <p className="text-gray-600">{category}</p>
          <p className="text-gray-600">{year}</p>
        </div>
      </div>
    </div>
  );
};

export default PaperCard;
