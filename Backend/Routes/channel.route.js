import { channelCreate, channelGet} from "../Controller/channel.controller.js";

export function createChannelRoute(app){
    app.post('/api/user/channel',channelCreate);
}

export function getChannelRoute(app){
    app.get('/api/user/channel', channelGet);
}