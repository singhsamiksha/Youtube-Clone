import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  channels: [],
}, {
  timestamps: true,
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
