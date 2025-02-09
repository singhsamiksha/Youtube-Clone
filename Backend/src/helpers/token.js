import jwt from 'jsonwebtoken';

const TokenHelper = {};
export default TokenHelper;

const secretKey = process.env.JWT_SECRET_TOKEN;

TokenHelper.generateUserToken = (user) => {
  const { email, username, _id: userId } = user;
  const payload = { email, username, userId };
  const options = {
    expiresIn: '7d',
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

TokenHelper.verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_TOKEN);
