import { channelCreate, channelGet} from "../Controller/channel.controller.js";
import express from "express"; 

const router = express.Router(); 

router.post('/newchannel',channelCreate);
router.get('/channels', channelGet);

export default router;