import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoForm from "./VideoForm";
import { API } from "../constants";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [editVideo, setEditVideo] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const user = localStorage.getItem("user");
  const userr = JSON.parse(user);
  const accessToken = userr?.user?.token;

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API}/videos`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Send accessToken in the Authorization header
        },
      });
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await axios.delete(`${API}/videos/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`, // Send accessToken in the Authorization header
  //       },
  //     });
  //     if (response.status === 200) {
  //       alert("Video deleted successfully!");
  //       setVideos(videos.filter((video) => video._id !== id));
  //     }
  //   } catch (error) {
  //     console.error("Error deleting video:", error);
  //   }
  // };

  const handleEdit = (video) => {
    setEditVideo(video);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Videos</h1>
      {!editVideo && (
        <div className="grid grid-cols-1 gap-4">
          {videos.map((video, index) => (
            <div
              key={video._id}
              className="flex space-x-4 bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div
                className="w-1/2 cursor-pointer"
                onClick={() => handleVideoClick({ url: video.urlEng })}
              >
                <img
                  src={video.posterEng}
                  alt={video.titleEng}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{`${index + 1}. ${
                    video.titleEng
                  }`}</h3>
                  <p className="text-gray-700 mb-2">{video.descriptionEng}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(video);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Edit
                    </button>
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(video._id);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button> */}
                  </div>
                </div>
              </div>
              <div
                className="w-1/2 cursor-pointer"
                onClick={() => handleVideoClick({ url: video.urlFre })}
              >
                <img
                  src={video.posterFre}
                  alt={video.titleFre}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{`${video.titleFre}`}</h3>
                  <p className="text-gray-700 mb-2">{video.descriptionFre}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            <button
              onClick={() => setSelectedVideo(null)}
              className="text-red-500 mb-4"
            >
              Close
            </button>
            <video
              src={selectedVideo.url}
              controls
              className="w-full rounded-md"
            />
          </div>
        </div>
      )}
      {editVideo && (
        <VideoForm
          video={editVideo}
          fetchVideos={fetchVideos}
          setEditVideo={setEditVideo}
        />
      )}
    </div>
  );
};

export default Videos;
