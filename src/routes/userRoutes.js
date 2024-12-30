const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth.middleware')


// Register GET Route
router.get('/register', userController.registerPage);

// Login GET Route
router.get('/login', userController.loginPage);

// Register POST Route
router.post('/', userController.postRegister);

// Login POST Route
router.post('/login', userController.postLogin);

// Google Authentication
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/private-chat');
    }
);

// Github Authentication
router.get('/github', passport.authenticate('github', {
    // scope: ["user:email"],
    scope: ['profile', 'email'],
    prompt: 'select_account'
}));

// Github Authentication Successful
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/private-chat');
    }
);

// Forget Password GET Route
router.get('/forget-password', userController.forgetPage);

// Forget Password POST Route
router.post('/forget-password', userController.forgetPassword);

// Check Email GET Route
router.get('/check-email', userController.checkEmail);

// Reset Password Page GET Route
router.get('/reset-password/:token', userController.resetPasswordPage)

// Reset Password POST Route
router.post('/reset-password/:token', userController.resetPassword)

// Success Page GET Route
router.get('/success', userController.successPage)


// Logout GET Route
router.get('/logout', userController.logoutUser);



module.exports = router;