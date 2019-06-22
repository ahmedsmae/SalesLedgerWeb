const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../../models/User');

// @route    POST api/users/targets/
// @desc     Add target
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty(),
            check('to', 'To date is required')
                .not()
                .isEmpty(),
            check('peritem', 'Item targets are required')
                .not()
                .isEmpty(),
            check('peritem', 'Item targets should be an array').isArray()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            from,
            to,
            defaulttarget,
            peritem, // todo: FRONTEND > to be sent as an array of objects contains itemid, units and budget
            description
        } = req.body;

        const newTarget = {
            title,
            from,
            to,
            defaulttarget,
            peritem,
            description
        };

        try {
            const user = await User.findById(req.user.id);
            user.data.targets.unshift(newTarget);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/targets/:id
// @desc     Edit target
// @access   Private
router.patch(
    '/:id',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty(),
            check('to', 'To date is required')
                .not()
                .isEmpty(),
            check('peritem', 'Item targets are required')
                .not()
                .isEmpty(),
            check('peritem', 'Item targets should be an array').isArray()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            from,
            to,
            defaulttarget,
            peritem, // todo: FRONTEND > to be sent as an array of objects contains itemid, units and budget
            description
        } = req.body;

        const newTarget = {
            title,
            from,
            to,
            defaulttarget,
            peritem,
            description
        };

        try {
            const user = await User.findById(req.user.id);
            // Get update index
            const updateIndex = user.data.targets
                .map(item => item.id)
                .indexOf(req.params.id);

            const updates = Object.keys(newTarget);

            updates.forEach(
                update =>
                    (user.data.targets[updateIndex][update] = newTarget[update])
            );

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/targets/:id
// @desc     Delete target
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.data.targets
            .map(item => item.id)
            .indexOf(req.params.id);

        user.data.targets.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
