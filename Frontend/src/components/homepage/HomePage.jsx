import { useState } from 'react';
import AppDrawer from '../common/AppDrawer';
import VideosGrid from './VideosGrid';
import CategoriesTab from './CategoriesTab';

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
