import Globals from '../../constants.js';
import DataHelper from '../helpers/data.js';
import TokenHelper from '../helpers/token.js';
import ChannelModel from '../models/channels.model.js';
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
            displayName: user.displayName,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
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

// API Controller to provide the currently logged in user, with channels
UserController.validateSignupForm1 = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.json({
        username: !username ? 'Username is required' : undefined,
        email: !email ? 'Email is required' : undefined,
      });
    }

    const usernameCheck = await UserModel.countDocuments({ username });
    const emailCheck = await UserModel.countDocuments({ email });

    return res.json({
      data: {
        username: usernameCheck ? 'Username has already been taken' : null,
        email: emailCheck ? 'Email has already been taken' : '',
      },
    });
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

// Handle the signup process for the user
UserController.registerUser = async (req, res) => {
  try {
    const { fullName, username, avatar } = req.body;
    let { email, password } = req.body;
    email = DataHelper.atob(email);
    password = DataHelper.atob(password);

    if (!email) {
      return res.status(401).json({ message: 'Email is required.' });
    }

    if (!password) {
      return res.status(401).json({ message: 'Password is required.' });
    }

    const existingUser = await UserModel.countDocuments({
      $or: [
        { email }, { username },
      ],
    });

    if (existingUser) {
      return res.status(401).json({
        errorCode: 404,
        message: 'User already exists',
      });
    }

    const user = await UserModel.create({
      displayName: fullName,
      username,
      email,
      password: await DataHelper.encrypt(password),
      avatar,
    });

    return res.json({
      data: {
        user: {
          _id: user._id,
          email: user.email,
          displayName: user.fullName,
          username: user.username,
        },
        token: TokenHelper.generateUserToken(user),
      },
    });
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};
