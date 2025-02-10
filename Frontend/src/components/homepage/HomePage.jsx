import { useState } from 'react';
import AppDrawer from '../common/AppDrawer';
import VideosGrid from './VideosGrid';
import CategoriesTab from './CategoriesTab';
import { useSelector } from 'react-redux';
import Welcomebar from './Welcomebar';


function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mainBar, setMainBar] = useState(true);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

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
      {isAuthenticated ? (
                <VideosGrid
                search=""
                selectedCategory={selectedCategory}
                mainBar={mainBar}
                toggleMainBar={toggleMainBar}
                
              />
      ) : (
        <Welcomebar />
      )}
    </AppDrawer>
  );
}

export default HomePage;
