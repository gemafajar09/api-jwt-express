const router = require('express').Router();
const { asyncHandler } = require('../middleware/asynchandler');
const authenticateJWT = require('../middleware/authMiddleware');
const checkEmail = require('../middleware/checkemail');
const { signup: signupValidator, signin: signinValidator } = require('../validator/validator');

const authController = require('../controller/authController');

router.route('/register').post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.register));
router.route('/login').post(signinValidator, asyncHandler(authController.login));
router.route('/home').get(authenticateJWT, asyncHandler(authController.home));

module.exports = router