const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../../models/User');

// @route    POST api/users/items/
// @desc     Add item
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Item name is required')
                .not()
                .isEmpty(),
            check('prices', 'Item prices are required')
                .not()
                .isEmpty(),
            check('prices', 'Item prices should be an array').isArray()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let {
            name,
            hint,
            size,
            prices, // todo: FRONTEND > to be sent as an array of objects contains priceid, value
            codes, // todo: FRONTEND > to be sent as a single string
            description
        } = req.body;

        if (codes) {
            codes = codes.split(',').map(code => code.trim());
        }

        const newItem = { name, hint, size, prices, codes, description };

        try {
            const user = await User.findById(req.user.id);
            user.data.items.unshift(newItem);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/items/:id
// @desc     Edit item
// @access   Private
router.patch(
    '/:id',
    [
        auth,
        [
            check('name', 'Item name is required')
                .not()
                .isEmpty(),
            check('prices', 'Item prices are required')
                .not()
                .isEmpty(),
            check('prices', 'Item prices should be an array').isArray()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let {
            name,
            hint,
            size,
            prices, // todo: FRONTEND > to be sent as an array of objects contains priceid, value
            codes, // todo: FRONTEND > to be sent as a single string
            description
        } = req.body;

        if (codes) {
            codes = codes.split(',').map(code => code.trim());
        }

        const newItem = { name, hint, size, prices, codes, description };

        try {
            const user = await User.findById(req.user.id);
            // Get update index
            const updateIndex = user.data.items
                .map(item => item.id)
                .indexOf(req.params.id);

            const updates = Object.keys(newItem);

            updates.forEach(
                update =>
                    (user.data.items[updateIndex][update] = newItem[update])
            );

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/items/:id
// @desc     Delete item
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.data.items
            .map(item => item.id)
            .indexOf(req.params.id);

        user.data.items.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
