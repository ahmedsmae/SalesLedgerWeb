const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../../models/User');

// @route    POST api/users/customers/titles
// @desc     Add customer title
// @access   Private
router.post(
    '/titles',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newTitle = req.body;

        try {
            const user = await User.findById(req.user.id);
            user.data.presets.customers.titles.unshift(newTitle);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/customers/titles/:id
// @desc     Edit customer title
// @access   Private
router.patch(
    '/titles/:id',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newTitle = req.body.title;

        try {
            const user = await User.findById(req.user.id);
            // Get update index
            const updateIndex = user.data.presets.customers.titles
                .map(item => item.id)
                .indexOf(req.params.id);

            user.data.presets.customers.titles[updateIndex].title = newTitle;

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/customers/titles/:id
// @desc     Delete customer title
// @access   Private
router.delete('/titles/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.data.presets.customers.titles
            .map(item => item.id)
            .indexOf(req.params.id);

        user.data.presets.customers.titles.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/users/customers/classes
// @desc     Add customer class
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
            user.data.presets.customers.classes.unshift(newClass);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/customers/classes/:id
// @desc     Edit customer class
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
            const updateIndex = user.data.presets.customers.classes
                .map(item => item.id)
                .indexOf(req.params.id);

            user.data.presets.customers.classes[updateIndex].class = newClass;

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/customers/classes/:id
// @desc     Delete customer class
// @access   Private
router.delete('/classes/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.data.presets.customers.classes
            .map(item => item.id)
            .indexOf(req.params.id);

        user.data.presets.customers.classes.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
