const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../../models/User');

// @route    POST api/users/colleagues/titles
// @desc     Add colleagues title
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
            user.data.presets.colleagues.titles.unshift(newTitle);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/colleagues/titles/:id
// @desc     Edit colleagues title
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
            const updateIndex = user.data.presets.colleagues.titles
                .map(item => item.id)
                .indexOf(req.params.id);

            user.data.presets.colleagues.titles[updateIndex].title = newTitle;

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/colleagues/titles/:id
// @desc     Delete colleague title
// @access   Private
router.delete('/titles/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.data.presets.colleagues.titles
            .map(item => item.id)
            .indexOf(req.params.id);

        user.data.presets.colleagues.titles.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/users/colleagues/classes
// @desc     Add colleague class
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
            user.data.presets.colleagues.classes.unshift(newClass);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/colleagues/classes/:id
// @desc     Edit colleague class
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
            const updateIndex = user.data.presets.colleagues.classes
                .map(item => item.id)
                .indexOf(req.params.id);

            user.data.presets.colleagues.classes[updateIndex].class = newClass;

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/colleagues/classes/:id
// @desc     Delete colleague class
// @access   Private
router.delete('/classes/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.data.presets.colleagues.classes
            .map(item => item.id)
            .indexOf(req.params.id);

        user.data.presets.colleagues.classes.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
