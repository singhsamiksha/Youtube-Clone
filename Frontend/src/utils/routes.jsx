import { createBrowserRouter } from 'react-router-dom';
import Video from '../components/Video-Component/video';
import Channel from '../components/Channel-Component/Channel';
import HomePage from '../components/HomePage-Components/HomePage';

const appRouter = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/videos', element: <Video /> },
  { path: '/channel', element: <Channel /> },
]);

export default appRouter;
