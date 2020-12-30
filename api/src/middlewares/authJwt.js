const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.createToken = (req, res, next) => {
    var id = uuidv4();
    var token

    if (req.body.keepLogin) token = jwt.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 * 30 }) // 30 days
    else token = jwt.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 }) // 24 hours

    req.token = token
    req.id = id

    next();
}

exports.verifyToken = (req, res, next) => {
    if (!req.headers["x-access-token"]) {
        return res.status(400).send({ success: false, error: { code: 400, message: 'Missing token.' } })
    }

    jwt.verify(req.headers["x-access-token"], process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).send({ success: false, error: { code: 401, message: 'Unauthorized.' } })
        }

        req.userID = decoded.id;
        next();
    })
}