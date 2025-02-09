import jwt from 'jsonwebtoken';
import Globals from '../../constants.js';
import DataHelper from '../helpers/data.js';
import TokenHelper from '../helpers/token.js';
import ChannelModel from '../models/channels.Model.js';
import UserModel from '../models/users.model.js';
import ErrorUtil from '../helpers/error.js';

const UserController = {};
export default UserController;

// Validates and provide the user a JWT Token based authentication response
UserController.signinUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = DataHelper.atob(email);
    password = DataHelper.atob(password);

    if (!email) {
      return res.status(401).json({ message: 'Email is required.' });
    }

    if (!password) {
      return res.status(401).json({ message: 'Password is required.' });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        errorCode: 404,
        message: 'Email does not exists.',
      });
    }

    const isPasswordValid = await DataHelper.compareHash(password, user.password);

    if (isPasswordValid) {
      return res.json({
        data: {
          user: {
            _id: user._id,
            email: user.email,
            name: user.username,
          },
          token: TokenHelper.generateUserToken(user),
        },
      });
    }

    return res.status(401).json({
      errorCode: Globals.ERROR_CODE.INVALID_USER_PASSWORD,
      message: 'Password is incorrect',
    });
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

// API Controller to provide the currently logged in user, with channels
UserController.getAuthUser = async (req, res) => {
  try {
    const { user } = req;
    if (user) {
      const channels = await ChannelModel.find({
        _id: { $in: (user.channels || []) },
      });
      return res.json({
        data: {
          user: {
            email: user.email,
            name: user.username,
            userId: user._id,
            channels,
          },
        },
      });
    }
    return res.status(401).json({
      message: 'You is not authenticated',
    });
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

// Handle the signup process for the user
UserController.createUser = async (req, res) => {
  const {
    username, email, password, image, channel,
  } = req.body;

  const user = new UserModel({
    username,
    email,
    password,
    image,
    channel,
  });

  user.save().then((data) => {
    if (!data) {
      return res.status(400).json({ message: 'Something went wrong' });
    }

    // Generate the access token
    const accessToken = jwt.sign({ username: data.username, email: data.email });
    return res.send({ accessToken, data });
  }).catch((error) => res.status(500).json({ message: 'Internal server error', error: error.message }));
};
