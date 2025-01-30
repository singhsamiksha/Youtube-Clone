import express from 'express';
import mongoose from 'mongoose';
import {CreateUserRoute, GetUserRoute} from './Routes/users.routes.js';
import { createChannelRoute, getChannelRoute } from './Routes/channel.route.js';
import { getVideoRoute } from './Routes/videos.route.js';

const app = new express();
app.use(express.json());


//Server is connection at port 3000
app.listen(3000, ()=> {
    console.log("Server is running on port 3000....");
})

//Mongodb connection established
mongoose.connect("mongodb://localhost:27017");
const db = mongoose.connection;
db.on("open", ()=> {
    console.log("Database is connected successfully!")
});

db.off("error", ()=> {
    console.log("Database connection is failed!")
})

CreateUserRoute(app);
GetUserRoute(app);
getVideoRoute(app);
createChannelRoute(app);
getChannelRoute(app);
