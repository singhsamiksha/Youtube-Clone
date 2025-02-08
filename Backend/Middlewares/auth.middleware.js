import TokenHelper from '../Helpers/token.js';
import UserModel from '../Model/users.model.js';

const Auth = {};
export default Auth; 

Auth.authenticateJWTToken = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = TokenHelper.verifyToken(token);
        const { userId } = decoded;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Invalid token' });
    }
};