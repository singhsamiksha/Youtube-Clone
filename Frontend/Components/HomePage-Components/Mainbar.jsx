import React, { useState } from "react";
import Tabs from "../Mainbar-Components/Tabs";
import AllVideos from "../Mainbar-Components/AllVideos";

const categories = [
  "All", "Music", "Mixes", "Rowan Atkinson", "Comedy clubs", "Game shows",
  "Shark Tank", "News", "T-Series", "Piyush Mishra", "Jukebox", "Live", "Dramedy"
];

function Mainbar({ search }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mainBar, setMainBar] = useState(true);

  const toggleMainBar = () => {
    setMainBar(!mainBar);
  };

  return (
    <>
      {mainBar && (
        <Tabs
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <AllVideos
        search={search}
        selectedCategory={selectedCategory}
        mainBar={mainBar}
        toggleMainBar={toggleMainBar}
      />
    </>
  );
}

export default Mainbar;
