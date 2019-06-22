const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../../models/User');

// @route    POST api/users/tasktypes/
// @desc     Add tasktype
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('tasktype', 'Type is required')
                .not()
                .isEmpty(),
            check('indicator', 'Indicator is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { tasktype, indicator } = req.body;

        const newType = { tasktype, indicator };

        try {
            const user = await User.findById(req.user.id);
            user.data.presets.tasktypes.unshift(newType);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/tasktypes/:id
// @desc     Edit tasktype
// @access   Private
router.patch(
    '/:id',
    [
        auth,
        [
            check('tasktype', 'Type is required')
                .not()
                .isEmpty(),
            check('indicator', 'Indicator is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { tasktype, indicator } = req.body;

        const newType = { tasktype, indicator };

        try {
            const user = await User.findById(req.user.id);
            // Get remove index
            const updateIndex = user.data.presets.tasktypes
                .map(item => item.id)
                .indexOf(req.params.id);

            const updates = Object.keys(newType);

            updates.forEach(
                update =>
                    (user.data.presets.tasktypes[updateIndex][update] =
                        newType[update])
            );

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/tasktypes/:id
// @desc     Delete tasktype
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.data.presets.tasktypes
            .map(item => item.id)
            .indexOf(req.params.id);

        user.data.presets.tasktypes.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
