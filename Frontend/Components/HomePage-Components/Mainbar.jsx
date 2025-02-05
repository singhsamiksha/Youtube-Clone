import React, { useState } from "react";
import Tabs from "../Mainbar-Components/Tabs";
import AllVideos from "../Mainbar-Components/AllVideos";

const categories = [
  "All", "Music", "Mixes", "Rowan Atkinson", "Comedy clubs", "Game shows",
  "Shark Tank", "News", "T-Series", "Piyush Mishra", "Jukebox", "Live", "Dramedy"
];

function Mainbar({ search }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <Tabs
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <AllVideos search={search} selectedCategory={selectedCategory}/>
    </>
  );
}


export default Mainbar;
