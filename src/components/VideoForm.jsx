import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../constants';

const VideoForm = ({ video, fetchVideos, setEditVideo }) => {
  const user = localStorage.getItem("user");

  const [titleEng, setTitleEng] = useState('');
  const [descriptionEng, setDescriptionEng] = useState('');
  const [urlEng, setUrlEng] = useState('');
  const [posterEng, setPosterEng] = useState('');
  const [titleFre, setTitleFre] = useState('');
  const [descriptionFre, setDescriptionFre] = useState('');
  const [urlFre, setUrlFre] = useState('');
  const [posterFre, setPosterFre] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!titleEng || !descriptionEng || !urlEng || !posterEng || !titleFre || !descriptionFre || !urlFre || !posterFre) {
      alert('Please fill out all fields');
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
      posterFre
    };

    try {
      const userr = JSON.parse(user);
      const accessToken = userr.user.token;

      if (video) {
        const response = await axios.patch(`${API}/videos/${video._id}`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        if (response.status === 200) {
          alert('Video updated successfully!');
          fetchVideos();
          setEditVideo(null);
        }else{
            alert("Failed to update video");
            setEditVideo(null);
        }
      } else {
        await axios.post(`${API}/videos`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
      }

      fetchVideos();
      setTitleEng('');
      setDescriptionEng('');
      setUrlEng('');
      setPosterEng('');
      setTitleFre('');
      setDescriptionFre('');
      setUrlFre('');
      setPosterFre('');
    } catch (error) {
      console.error('Error saving video:', error);
      alert('Failed to save video');
    }
  };

  return (
    <div className="max-w-xxl mx-auto bg-white p-6 rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">{video ? 'Edit Video' : 'Add New Video'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titleEng" className="block font-medium">Title (English)</label>
          <input type="text" id="titleEng" value={titleEng} onChange={(e) => setTitleEng(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label htmlFor="descriptionEng" className="block font-medium">Description (English)</label>
          <textarea id="descriptionEng" value={descriptionEng} onChange={(e) => setDescriptionEng(e.target.value)} rows="3" className="w-full mt-1 p-2 border rounded-md"></textarea>
        </div>
        <div>
          <label htmlFor="urlEng" className="block font-medium">Video URL (English)</label>
          <input type="text" id="urlEng" value={urlEng} onChange={(e) => setUrlEng(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label htmlFor="posterEng" className="block font-medium">Thumbnail Image (English)</label>
          <input type="text" id="posterEng" value={posterEng} onChange={(e) => setPosterEng(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label htmlFor="titleFre" className="block font-medium">Title (French)</label>
          <input type="text" id="titleFre" value={titleFre} onChange={(e) => setTitleFre(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label htmlFor="descriptionFre" className="block font-medium">Description (French)</label>
          <textarea id="descriptionFre" value={descriptionFre} onChange={(e) => setDescriptionFre(e.target.value)} rows="3" className="w-full mt-1 p-2 border rounded-md"></textarea>
        </div>
        <div>
          <label htmlFor="urlFre" className="block font-medium">Video URL (French)</label>
          <input type="text" id="urlFre" value={urlFre} onChange={(e) => setUrlFre(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label htmlFor="posterFre" className="block font-medium">Thumbnail Image (French)</label>
          <input type="text" id="posterFre" value={posterFre} onChange={(e) => setPosterFre(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 mr-4">{video ? 'Update Video' : 'Add Video'}</button>
        {video && <button type="button" className="bg-red-500 text-white py-2 px-4 rounded-md mt-4" onClick={() => setEditVideo(null)}>Cancel</button>}
      </form>
    </div>
  );
};

export default VideoForm;
