import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "../../Stylesheets/AllVideos.css"; // Use this to handle styles

function AllVideos({ search, selectedCategory, mainBar, toggleMainBar}) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Fetch videos from the API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/videos");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  // Filter videos based on search and selected category
  const filteredVideos = videos.filter((video) =>
    selectedCategory === "All"
      ? video.title.toLowerCase().includes(search.toLowerCase())
      : video.title.toLowerCase().includes(search.toLowerCase()) &&
        video.title.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    toggleMainBar();
  };

  if (videos.length === 0) {
    return <div>Loading...</div>; // Display loading message if videos are not yet fetched
  }

  return selectedVideo ? (
    <div className="Video" style={{display: "flex", justifyContent: "space-between"}}>
      <div className="left" style={{width: "60%"}}>
        <video src={selectedVideo.videoUrl} className="video" controls width="100%" ></video>
        <CardContent sx={{ border: "none" }}>
          <Typography
            gutterBottom
            component="div"
            sx={{ color: "black", fontSize: "25px", fontWeight: "500" }}
          >
            {selectedVideo.title}
          </Typography>
          <div className="subheadings">
            <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "large" }}>
              {selectedVideo.uploader}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {selectedVideo.likes} Likes
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {selectedVideo.dislikes} Dislikes
            </Typography>
            </div>
            <div className="detailBox">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {selectedVideo.views} Views
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {selectedVideo.description}
              </Typography>
            </div>
          <Card className="Comments" sx={{width: "60%"}}>
          <Typography>Comments: {selectedVideo.comments.length}</Typography>
          <input placeholder="Add a Comment"></input>
          {selectedVideo.comments.map((comment) => (
            <div key={comment.commentId}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {comment.text}
              </Typography>
            </div>
          ))}
        </Card>
        </CardContent>

        
      </div>
      <div className="right" style={{display:"flex", flexDirection:"column",  gap: "5px" ,justifyContent:"center", border: "none"}}>
      {filteredVideos.map((video) => (
        <Card
          key={video.videoId}
          sx={{ maxWidth: 400, border: "none", width: "100%"}}
          onClick={() => handleVideoClick(video)}
        >
          <CardActionArea sx={{ display: "flex"}} >
            <CardMedia
              component="img"
              height="100"
              width="100"
              image={video.thumbnailUrl}
              alt={video.videoId}
            />
            <CardContent sx={{ border: "none" }}>
              <Typography
                gutterBottom
                component="div"
                sx={{ color: "black", fontSize: "15px", fontWeight: "500" }}
              >
                {video.title}
              </Typography>
              <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "13px" }}>
                {video.uploader}
              </Typography>
              <div className="subheadings">
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "13px" }}>
                  {video.views} Views
                </Typography>
                <FiberManualRecordIcon sx={{ fontSize: "7px" }} />
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "13px" }}>
                  On {video.uploadDate}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
    </div>
  ) : (
    <div className="AllVideos">
      {filteredVideos.map((video) => (
        <Card
          key={video.videoId}
          sx={{ maxWidth: 345, border: "none" }}
          onClick={() => handleVideoClick(video)}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              width="200"
              image={video.thumbnailUrl}
              alt={video.videoId}
            />
            <CardContent sx={{ border: "none" }}>
              <Typography
                gutterBottom
                component="div"
                sx={{ color: "black", fontSize: "17px", fontWeight: "500" }}
              >
                {video.title}
              </Typography>
              <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "15px" }}>
                {video.uploader}
              </Typography>
              <div className="subheadings">
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {video.views} Views
                </Typography>
                <FiberManualRecordIcon sx={{ fontSize: "7px" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  On {video.uploadDate}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}

export default AllVideos;
