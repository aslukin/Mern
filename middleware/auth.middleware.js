const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        
        const tocken = req.headers.authorization.split(' ')[1];

        if (!tocken) {
            return res.status(401).json({ message: 'No authorisation 1'});
        }

        const decoded = jwt.verify(tocken, config.get('jwtsecret'))

        req.user = decoded;
        next();

    } catch (e) {
        return res.status(401).json({ message: 'No authorisation 2'});

    }
};