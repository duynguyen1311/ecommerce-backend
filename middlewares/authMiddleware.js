const jwt = require('jsonwebtoken');


module.exports.authMiddleware = async (req, res, next) => {
    const {accessToken} = req.cookies;
    console.log("AccessToken : ", accessToken);
    if (!accessToken) {
        return res.status(409).json({error: 'Please Login First'});
    } else {
        try {
            const decodeToken = await jwt.verify(accessToken, process.env.JWT_SECRET );
            req.role = decodeToken.role;
            req.id = decodeToken.id;
            next();
        } catch (error) {
            return res.status(409).json({error: 'Please Login'});
        }
    }
}