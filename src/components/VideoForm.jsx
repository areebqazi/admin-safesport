import React, { useState, useEffect } from "react";
import axios from "axios";
import AWS from "aws-sdk";
import { API } from "../constants";

const VideoForm = ({ video, fetchVideos, setEditVideo }) => {
  const user = localStorage.getItem("user");

  const [titleEng, setTitleEng] = useState("");
  const [descriptionEng, setDescriptionEng] = useState("");
  const [urlEng, setUrlEng] = useState("");
  const [posterEng, setPosterEng] = useState("");
  const [titleFre, setTitleFre] = useState("");
  const [descriptionFre, setDescriptionFre] = useState("");
  const [urlFre, setUrlFre] = useState("");
  const [posterFre, setPosterFre] = useState("");

  const [progressEng, setProgressEng] = useState(0);
  const [progressFre, setProgressFre] = useState(0);
  const [fileNameEng, setFileNameEng] = useState("");
  const [fileNameFre, setFileNameFre] = useState("");

  useEffect(() => {
    if (video) {
      setTitleEng(video.titleEng);
      setDescriptionEng(video.descriptionEng);
      setUrlEng(video.urlEng);
      setPosterEng(video.posterEng);
      setTitleFre(video.titleFre);
      setDescriptionFre(video.descriptionFre);
      setUrlFre(video.urlFre);
      setPosterFre(video.posterFre);
    }
  }, [video]);

  const handleFileUpload = (
    file,
    setProgress,
    setUrl,
    setFileName,
    language
  ) => {
    const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME;
    if (!bucketName) {
      console.error(
        "Bucket name is not set. Please set REACT_APP_AWS_BUCKET_NAME in your .env file."
      );
      alert("Bucket name is not configured.");
      return;
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });

    const directory =
      language === "English" ? "english-with-caption" : "french-with-caption";
    const params = {
      Bucket: bucketName,
      Key: `${directory}/${Date.now()}_${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    s3.upload(params)
      .on("httpUploadProgress", (evt) => {
        const progress = Math.round((evt.loaded / evt.total) * 100);
        setProgress(progress);
      })
      .send((err, data) => {
        if (err) {
          console.error("Error uploading file:", err);
          alert(`Failed to upload file: ${err.message}`);
          return;
        }

        // Replace with your CloudFront domain
        const cloudFrontDomain = "dqdi1yce51qjt.cloudfront.net";
        const fileUrl = `https://${cloudFrontDomain}/${params.Key}`;

        console.log("Upload successful:", data);
        setFileName(file.name);
        setUrl(fileUrl);
        alert(`Upload complete: ${file.name}`);
      });
  };

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

    const formData = {
      titleEng,
      descriptionEng,
      urlEng,
      posterEng,
      titleFre,
      descriptionFre,
      urlFre,
      posterFre,
    };

    try {
      const userr = JSON.parse(user);
      const accessToken = userr.user.token;

      if (video) {
        const response = await axios.patch(
          `${API}/videos/${video._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Video updated successfully!");
          fetchVideos();
          setEditVideo(null);
        } else {
          alert("Failed to update video");
          setEditVideo(null);
        }
      } else {
        await axios.post(`${API}/videos`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }

      fetchVideos();
      setTitleEng("");
      setDescriptionEng("");
      setUrlEng("");
      setPosterEng("");
      setTitleFre("");
      setDescriptionFre("");
      setUrlFre("");
      setPosterFre("");
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Failed to save video");
    }
  };

  return (
    <div className="max-w-xxl mx-auto bg-white p-6 rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">
        {video ? "Edit Video" : "Add New Video"}
      </h2>
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
          <label htmlFor="videoFileEng" className="block font-medium">
            Video File (English)
          </label>
          <input
            type="file"
            id="videoFileEng"
            onChange={(e) =>
              handleFileUpload(
                e.target.files[0],
                setProgressEng,
                setUrlEng,
                setFileNameEng,
                "English"
              )
            }
            className="w-full mt-1 p-2 border rounded-md"
          />
          <div className="relative mt-2">
            <progress
              value={progressEng}
              max="100"
              className="w-full h-2 bg-gray-200 rounded"
            >
              {progressEng}%
            </progress>
          </div>
        </div>
        <div>
          <label htmlFor="posterEng" className="block font-medium">
            Thumbnail Image (English)
          </label>
          <input
            type="text"
            id="posterEng"
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
          <label htmlFor="videoFileFre" className="block font-medium">
            Video File (French)
          </label>
          <input
            type="file"
            id="videoFileFre"
            onChange={(e) =>
              handleFileUpload(
                e.target.files[0],
                setProgressFre,
                setUrlFre,
                setFileNameFre,
                "French"
              )
            }
            className="w-full mt-1 p-2 border rounded-md"
          />
          <div className="relative mt-2">
            <progress
              value={progressFre}
              max="100"
              className="w-full h-2 bg-gray-200 rounded"
            >
              {progressFre}%
            </progress>
          </div>
        </div>
        <div>
          <label htmlFor="posterFre" className="block font-medium">
            Thumbnail Image (French)
          </label>
          <input
            type="text"
            id="posterFre"
            value={posterFre}
            onChange={(e) => setPosterFre(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 mr-4"
        >
          {video ? "Update Video" : "Add Video"}
        </button>
        {video && (
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded-md mt-4"
            onClick={() => setEditVideo(null)}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default VideoForm;
