import jwt from 'jsonwebtoken';

const TokenHelper = {};
export default TokenHelper;

const secretKey = process.env.JWT_SECRET_TOKEN;

TokenHelper.generateUserToken = (user) => {
    const { email, username, } = user;
    const payload = { email, username };
    const options = {
        expiresIn: '1h', // Token expiration time
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
};