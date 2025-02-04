import { createBrowserRouter} from "react-router-dom";
import App from "../src/App";
import Video from "../Components/Video-Component/video";
import Channel from "../Components/Channel-Component/Channel";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/videos",
        element: <Video />
    },
    {
        path: "/channel",
        element: <Channel />
    }
]);

export default appRouter;
