const router = require('express').Router();
const verifySignup = require('../middlewares/verifySignUp');
const authJwt = require('../middlewares/authJwt');
const userController = require('../controllers/userController');

router.post('/signup', verifySignup.verifyDuplicateUser, authJwt.createToken, userController.signup);

module.exports = router;