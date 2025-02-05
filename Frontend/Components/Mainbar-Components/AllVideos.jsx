import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import "../../Stylesheets/AllVideos.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function AllVideos({ search , selectedCategory}) {
    const [videos, setVideos] = useState([]);
  
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
  
    const filteredVideos = videos.filter((video) =>
        selectedCategory === "All"
          ? video.title.toLowerCase().includes(search.toLowerCase())
          : video.title.toLowerCase().includes(search.toLowerCase()) &&
            video.title.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  
    return (
      <div className="AllVideos">
        {filteredVideos.map((video) => (
          <Card key={video.videoId} sx={{ maxWidth: 345, border: "none" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                width="200"
                image={video.thumbnailUrl}
                alt={video.videoId}
                border="none"
              />
              <CardContent sx={{ border: "none" }}>
                <Typography
                  gutterBottom
                  component="div"
                  sx={{ color: "black", fontSize: "17px", fontWeight: "500" }}
                >
                  {video.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "text.secondary", fontSize: "15px" }}
                >
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
