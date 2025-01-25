import express from 'express';
import mongoose from 'mongoose';
import {CreateUserRoute, GetUserRoute} from './Routes/users.routes.js';
import { channelCreate, channelGet } from './Controller/channel.controller.js';
import { GetVideos } from './Controller/videos.controller.js';

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
GetVideos(app);
//channelCreate(app);
//channelGet(app);
