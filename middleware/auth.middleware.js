const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        
        const tocken = req.headers.authorization.split(' ')[1];

        if (!tocken) {
            return res.status(401).json({ message: 'No authorisation'});
        }

        const decoded = jwt.verify(tocken, config.get('jwtSecret'))

        req.user = decoded;
        next();

    } catch (e) {
        return res.status(401).json({ message: 'No authorization'});

    }
};