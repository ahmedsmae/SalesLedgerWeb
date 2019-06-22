const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../../models/User');

// @route    POST api/users/register
// @desc     Register user
// @access   Public
router.post(
    '/register',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is requires')
            .not()
            .isEmpty(),
        check(
            'password',
            'Please enter a password with 7 or more characters'
        ).isLength({ min: 7 }),
        check('password', 'password cannot contains the word "password"')
            .isLowercase()
            .not()
            .contains('password')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
            }

            user = new User({ name, email, password });

            // hashing the password will be done automatically in the User model before save()
            await user.save();

            const token = await user.generateAuthToken();

            res.json({ user, token });
        } catch (err) {
            console.error(err.message);
            res.status(400).send({ msg: err.message });
        }
    }
);

// @route    POST api/users/login
// @desc     Login user
// @access   Public
router.post(
    '/login',
    [
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required')
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findByCredentials(email, password);
            const token = await user.generateAuthToken();

            res.json({ user, token });
        } catch (err) {
            console.error(err.message);
            res.status(400).send({ msg: err.message });
        }
    }
);

// @route    GET api/users/me
// @desc     Get current user data
// @access   Private
router.get('/me', auth, async (req, res) => {
    res.send(req.user);
});

// @route    POST api/users/logout
// @desc     Logout - Single session
// @access   Private
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.json({ msg: 'User logged out from current session' });
    } catch (err) {
        res.status(500).send({ msg: err.message });
    }
});

// @route    POST api/users/logoutAll
// @desc     Logout - All sessions
// @access   Private
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.json({ msg: 'User logged out from all sessions' });
    } catch (err) {
        res.status(500).send({ msg: err.message });
    }
});

// @route    DELETE api/users/me
// @desc     Delete user
// @access   Private
router.delete('/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.json({ user: req.user, msg: 'User deleted' });
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
