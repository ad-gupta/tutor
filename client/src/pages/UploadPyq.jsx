import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MyLoader from "../components/MyLoader";

const UploadPyq = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState(2023);
  const [price, setPrice] = useState("");
  const [video, setVideo] = useState(null);
  const [pdf, setPdf] = useState("");
  //   const [uploadedImgUrl, setUploadedImgUrl] = useState("");
  const [previewPdfUrl, setPreviewPdfUrl] = useState("");
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", pdf);
    data.append("upload_preset", "pdf_preset");

    try {
      let cloudName = "dfzsw9nsu";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url.replace(".pdf", ".jpg");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const url = await uploadFile();
      if (!loading) {
        setPreviewPdfUrl(url);
      }

      const { data } = await axios.post(`/api/v1/postPaper`, {
        title,
        price,
        file: url,
        year,
        category
      });
      console.log(data);
      alert.success("Uploaded Successfully!");
      setLoading(false);
      navigate("/pyqs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-20">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Become A Tutor</h1>

        <div className="w-full max-w-lg mx-auto">
          <h1 className="text-xl font-bold mb-4">Your Details</h1>
          <form onSubmit={handleSubmit} className="space-y-4 mb-10 max-sm:px-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Enter title
              </label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Mathematics Previous Year Paper"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Mention year
              </label>
              <input
                type="number"
                max="2025"
                min="1900"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="2023"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600">
                  Select Category
                </label>
                <select
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category...</option>
                  <option value="Primary">Primary</option>
                  <option value="High School">High School</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="graduation">Graduation</option>
                  <option value="postGraduation">Post Graduation</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600">
                  Price of this pyq (₹)
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="₹-49"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="">
              <div className="m-3 roun bg-white w-auto border-4 border-slate-500 rounded-lg max-sm:px-8">
                <label
                  htmlFor="fileinput"
                  className="text-sm font-medium text-gray-600 cursor-pointer"
                >
                  {previewPdfUrl ? (
                    <div className="w-[30vh] h-[30vh]">
                      <embed
                        src={previewPdfUrl}
                        type="application/pdf"
                        alt="Preview"
                        className="w-[30vh] h-[30vh]"
                      />
                    </div>
                  ) : (
                    <img
                      src="./upload_img.webp"
                      alt=""
                      className="w-[30vh] h-[30vh] p-10"
                    />
                  )}
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  id="fileinput"
                  onChange={(e) => setPdf((prev) => e.target.files[0])}
                  className="hidden"
                />
              </div>
              {loading && <MyLoader />}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPyq;
