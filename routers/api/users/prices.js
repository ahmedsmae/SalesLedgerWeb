const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../../models/User');

// @route    POST api/users/prices/
// @desc     Add price
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Price name is required')
                .not()
                .isEmpty(),
            check('currency', 'Currency is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, currency } = req.body;

        const newPrice = { name, currency };

        try {
            const user = await User.findById(req.user.id);
            user.data.presets.prices.unshift(newPrice);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/prices/:id
// @desc     Edit price
// @access   Private
router.patch(
    '/:id',
    [
        auth,
        [
            check('name', 'Price name is required')
                .not()
                .isEmpty(),
            check('currency', 'Currency is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, currency } = req.body;

        const newPrice = { name, currency };

        try {
            const user = await User.findById(req.user.id);
            // Get remove index
            const updateIndex = user.data.presets.prices
                .map(item => item.id)
                .indexOf(req.params.id);

            const updates = Object.keys(newPrice);

            updates.forEach(
                update =>
                    (user.data.presets.prices[updateIndex][update] =
                        newPrice[update])
            );

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/prices/:id
// @desc     Delete price
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.data.presets.prices
            .map(item => item.id)
            .indexOf(req.params.id);

        user.data.presets.prices.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
