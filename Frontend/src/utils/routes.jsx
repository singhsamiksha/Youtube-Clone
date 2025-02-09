import { createBrowserRouter } from 'react-router-dom';
import Video from '../components/common/Video';
import Channel from '../components/channel/Channel';
import HomePage from '../components/homepage/HomePage';
import Signin from '../components/auth/signin/Signin';
import VideoPlayerPage from '../components/video/VideoPlayerPage';
import AppDrawer from '../components/common/AppDrawer';

const appRouter = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/signin', element: <Signin /> },
  { path: '/video/:videoId', element: <AppDrawer><VideoPlayerPage /></AppDrawer> },
  { path: '/channel/:channelId', element: <AppDrawer><Channel /></AppDrawer> },
]);

export default appRouter;
