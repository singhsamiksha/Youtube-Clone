import 'dotenv/config';
import Express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import user from './src/routes/users.routes.js';
import channel from './src/routes/channel.route.js';
import video from './src/routes/videos.route.js';

const app = new Express();
app.use(Express.json());
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
