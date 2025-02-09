import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import user from './Routes/users.routes.js';
import channel from './Routes/channel.route.js';
import video from './Routes/videos.route.js';

const app = new express();
app.use(express.json());
app.use(cors());

// Server is connection at port 3000
app.listen(process.env.APP_PORT, () => {
  console.log('Server is running on port 3000....');
});

// Mongodb connection established
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('open', () => {
  console.log('Database is connected successfully!');
});

db.off('error', () => {
  console.log('Database connection is failed!');
});

app.use('/user', user);
app.use('/channel', channel);
app.use('/video', video);
