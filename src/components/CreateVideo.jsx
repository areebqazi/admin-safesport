// VideoForm.js
import React, { useState } from "react";
import axios, { formToJSON } from "axios";
import { API } from "../constants";

const VideoForm = () => {
  const user = localStorage.getItem("user");
  const [titleEng, setTitleEng] = useState("");
  const [descriptionEng, setDescriptionEng] = useState("");
  const [urlEng, setUrlEng] = useState("");
  const [posterEng, setPosterEng] = useState("");
  const [titleFre, setTitleFre] = useState("");
  const [descriptionFre, setDescriptionFre] = useState("");
  const [urlFre, setUrlFre] = useState("");
  const [posterFre, setPosterFre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !titleEng ||
      !descriptionEng ||
      !urlEng ||
      !posterEng ||
      !titleFre ||
      !descriptionFre ||
      !urlFre ||
      !posterFre
    ) {
      alert("Please fill out all fields");
      return;
    }
    const formData = new FormData();
    formData.append("titleEng", titleEng);
    formData.append("descriptionEng", descriptionEng);
    formData.append("urlEng", urlEng);
    formData.append("posterEng", posterEng);
    formData.append("titleFre", titleFre);
    formData.append("descriptionFre", descriptionFre);
    formData.append("urlFre", urlFre);
    formData.append("posterFre", posterFre);

    console.log("user", user);
    const userr = JSON.parse(user);
    const accessToken = userr.user.token;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/videos",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send accessToken in the Authorization header
          },
        }
      );

      if (response.status === 201) {
        alert("New video added successfully!");
        setTitleEng("");
        setDescriptionEng("");
        setUrlEng("");
        setPosterEng(null);
        setTitleFre("");
        setDescriptionFre("");
        setUrlFre("");
        setPosterFre(null);
      } else {
        alert("Failed to add new video");
      }
    } catch (error) {
      console.error("Error adding new video:", error);
      alert("Failed to add new video");
    }
  };

  return (
    <div className="max-w-xxl mx-auto bg-white p-6 rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add New Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titleEng" className="block font-medium">
            Title (English)
          </label>
          <input
            type="text"
            id="titleEng"
            value={titleEng}
            onChange={(e) => setTitleEng(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="descriptionEng" className="block font-medium">
            Description (English)
          </label>
          <textarea
            id="descriptionEng"
            value={descriptionEng}
            onChange={(e) => setDescriptionEng(e.target.value)}
            rows="3"
            className="w-full mt-1 p-2 border rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="urlEng" className="block font-medium">
            Video URL (English)
          </label>
          <input
            type="text"
            id="urlEng"
            value={urlEng}
            onChange={(e) => setUrlEng(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="urlEng" className="block font-medium">
            Thumbnail Image (English)
          </label>
          <input
            type="text"
            id="urlEng"
            value={posterEng}
            onChange={(e) => setPosterEng(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="titleFre" className="block font-medium">
            Title (French)
          </label>
          <input
            type="text"
            id="titleFre"
            value={titleFre}
            onChange={(e) => setTitleFre(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="descriptionFre" className="block font-medium">
            Description (French)
          </label>
          <textarea
            id="descriptionFre"
            value={descriptionFre}
            onChange={(e) => setDescriptionFre(e.target.value)}
            rows="3"
            className="w-full mt-1 p-2 border rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="urlFre" className="block font-medium">
            Video URL (French)
          </label>
          <input
            type="text"
            id="urlFre"
            value={urlFre}
            onChange={(e) => setUrlFre(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="urlFre" className="block font-medium">
            Thumbnail Image (French)
          </label>
          <input
            type="text"
            id="urlFre"
            value={posterFre}
            onChange={(e) => setPosterFre(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
        >
          Add Video
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
