import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyLoader from "./MyLoader";
import { useAlert } from "react-alert";

const AddTutor = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [fee, setFee] = useState("");
  const [video, setVideo] = useState(null);
  const [img, setImg] = useState("");
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const alert = useAlert()

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append('file', type === 'image' ? img : video)
    data.append('upload_preset', type === 'image' ? 'image_preset' : 'video_preset')

    try {
        let cloudName = "dfzsw9nsu"
        let resourceType = type === 'image' ? 'image' : 'video'
        let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

        const res = await axios.post(api, data);
        const {secure_url } = res.data
        console.log(secure_url)
        return secure_url
    } catch (error) {
        console.log(error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const imgUrl = await uploadFile('image');
      const videoUrl = await uploadFile('video');
      if(!loading) {
        setPreviewImgUrl(imgUrl);
        setPreviewVideoUrl(videoUrl)
      }

      const { data } = await axios.post(`/api/v1/addCourse`, {
        title: subject,
        fee,
        category,
        image: imgUrl,
        video: videoUrl
      });
      console.log(data);
      alert.success("Uploaded Successfully!")
      setLoading(false)
      navigate('/learn')
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
                Enter your name
              </label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="John Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Subject You will teach
              </label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Mathematics"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
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
                  <option value="Matric">High School</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="graduation">Graduation</option>
                  <option value="postGraduation">Post Graduation</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600">
                  Fees/hr per month (₹)
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="₹-199"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                />
              </div>
            </div>
            <div className="">
            <div className="flex justify-between max-sm:flex-col">
              <div className="m-3 roun bg-white w-auto border-4 border-slate-500 rounded-lg max-sm:px-8">
                <label
                  htmlFor="videoInput"
                  className="text-sm font-medium text-gray-600 cursor-pointer"
                >
                  {previewVideoUrl ? (
                    <div className="w-[30vh] h-[30vh]">
                      <video
                        src={previewVideoUrl}
                        alt="Preview"
                        className="w-[30vh] h-[30vh]"
                        controls
                      />
                    </div>
                  ) : (
                    <img
                      src="./video_upload.jpg"
                      alt=""
                      className="w-[30vh] h-[30vh]"
                    />
                  )}
                </label>
                <input
                  type="file"
                  accept="video/*"
                  id="videoInput"
                  onChange={(e) => setVideo((prev) => e.target.files[0])}
                  className="hidden"
                />
              </div>

              <div className="m-3 roun bg-white w-auto border-4 border-slate-500 rounded-lg max-sm:px-8">
                <label
                  htmlFor="fileinput"
                  className="text-sm font-medium text-gray-600 cursor-pointer"
                >
                  {previewImgUrl ? (
                    <div className="w-[30vh] h-[30vh]">
                      <img
                        src={previewImgUrl}
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
                  accept="image/*"
                  id="fileinput"
                  multiple
                  onChange={(e) => setImg((prev) => e.target.files[0])}
                  className="hidden"
                />
              </div>
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

export default AddTutor;
