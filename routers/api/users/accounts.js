const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../../models/User');

// @route    POST api/users/accounts/types
// @desc     Add account type
// @access   Private
router.post(
    '/types',
    [
        auth,
        [
            check('accounttype', 'Type is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newType = req.body;

        try {
            const user = await User.findById(req.user.id);
            user.data.presets.accounts.types.unshift(newType);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/accounts/types/:id
// @desc     Edit account type
// @access   Private
router.patch(
    '/types/:id',
    [
        auth,
        [
            check('accounttype', 'Type is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newType = req.body.accounttype;

        try {
            const user = await User.findById(req.user.id);
            // Get update index
            const updateIndex = user.data.presets.accounts.types
                .map(item => item.id)
                .indexOf(req.params.id);

            user.data.presets.accounts.types[updateIndex].accounttype = newType;

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/accounts/types/:id
// @desc     Delete account type
// @access   Private
router.delete('/types/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.data.presets.accounts.types
            .map(item => item.id)
            .indexOf(req.params.id);

        user.data.presets.accounts.types.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/users/accounts/classes
// @desc     Add account class
// @access   Private
router.post(
    '/classes',
    [
        auth,
        [
            check('class', 'Class is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newClass = req.body;

        try {
            const user = await User.findById(req.user.id);
            user.data.presets.accounts.classes.unshift(newClass);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/accounts/classes/:id
// @desc     Edit account class
// @access   Private
router.patch(
    '/classes/:id',
    [
        auth,
        [
            check('class', 'Class is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newClass = req.body.class;

        try {
            const user = await User.findById(req.user.id);
            // Get update index
            const updateIndex = user.data.presets.accounts.classes
                .map(item => item.id)
                .indexOf(req.params.id);

            user.data.presets.accounts.classes[updateIndex].class = newClass;

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/accounts/classes/:id
// @desc     Delete account class
// @access   Private
router.delete('/classes/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.data.presets.accounts.classes
            .map(item => item.id)
            .indexOf(req.params.id);

        user.data.presets.accounts.classes.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
