import { useState } from 'react';
import AppDrawer from '../common/AppDrawer';
import VideosGrid from './VideosGrid';
import CategoriesTab from './CategoriesTab';

const categories = [
  'All', 'Music', 'Mixes', 'Rowan Atkinson', 'Comedy clubs', 'Game shows',
  'Shark Tank', 'News', 'T-Series', 'Piyush Mishra', 'Jukebox', 'Live', 'Dramedy',
];

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mainBar, setMainBar] = useState(true);

  const toggleMainBar = () => {
    setMainBar(false);
  };

  return (
    <AppDrawer>
      {!!mainBar && (
        <CategoriesTab
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <VideosGrid
        search=""
        selectedCategory={selectedCategory}
        mainBar={mainBar}
        toggleMainBar={toggleMainBar}
      />
    </AppDrawer>
  );
}

export default HomePage;
