import { GetVideos } from "../Controller/videos.controller.js";

export function getVideoRoute(app) {
    app.get('/api/getvideos', GetVideos);
}
