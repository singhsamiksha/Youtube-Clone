import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import user from './Routes/users.routes.js';
import channel from './Routes/channel.route.js';
import video from './Routes/videos.route.js';

const app = new express();
app.use(express.json());
app.use(cors());


//Server is connection at port 3000
app.listen(3000, ()=> {
    console.log("Server is running on port 3000....");
})

//Mongodb connection established
mongoose.connect("mongodb+srv://singhsamiksha877:AlyuB4oOGdkrPOm0@cluster0.6aa60.mongodb.net/");
const db = mongoose.connection;
db.on("open", ()=> {
    console.log("Database is connected successfully!")
});

db.off("error", ()=> {
    console.log("Database connection is failed!")
})

app.use('/user', user,channel,video);