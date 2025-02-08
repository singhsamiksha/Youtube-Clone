import HomePage from './components/HomePage-Components/HomePage';
import appRouter from './utils/routes.jsx';
import { RouterProvider } from 'react-router-dom';
import './App.css';

const App = () => (
  <>
    <RouterProvider router={appRouter} />
  </>
);

export default App;
