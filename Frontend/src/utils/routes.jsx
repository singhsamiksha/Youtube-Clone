import { createBrowserRouter } from 'react-router-dom';
import Video from '../components/common/Video';
import Channel from '../components/channel/Channel';
import HomePage from '../components/homepage/HomePage';
import Signin from '../components/auth/signin/Signin';

const appRouter = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/signin', element: <Signin /> },
  { path: '/videos', element: <Video /> },
  { path: '/channel', element: <Channel /> },
]);

export default appRouter;
