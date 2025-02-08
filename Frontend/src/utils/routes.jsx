import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Video from '../components/Video-Component/video';
import Channel from '../components/Channel-Component/Channel';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/videos',
    element: <Video />,
  },
  {
    path: '/channel',
    element: <Channel />,
  },
]);

export default appRouter;
