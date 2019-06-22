const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../../models/User');

// @route    POST api/users/area/
// @desc     Add area
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Area name is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description } = req.body;

        const pools = [];

        const newArea = { name, pools, description };

        try {
            const user = await User.findById(req.user.id);
            user.data.area.unshift(newArea);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/area/:id
// @desc     Edit area
// @access   Private
router.patch(
    '/:id',
    [
        auth,
        [
            check('name', 'Area name is required')
                .not()
                .isEmpty(),
            check('pools', 'Pools should be an array').isArray()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            pools, // todo: FRONTEND > to be sent as an array of pool objects
            description
        } = req.body;

        const newArea = { name, pools, description };

        try {
            const user = await User.findById(req.user.id);
            // Get update index
            const updateIndex = user.data.area
                .map(item => item.id)
                .indexOf(req.params.id);

            const updates = Object.keys(newArea);

            updates.forEach(
                update =>
                    (user.data.area[updateIndex][update] = newArea[update])
            );

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/area/:id
// @desc     Delete area
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.data.area
            .map(item => item.id)
            .indexOf(req.params.id);

        user.data.area.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/users/area/:areaId
// @desc     Add pool
// @access   Private
router.post(
    '/:areaId',
    [
        auth,
        [
            check('name', 'Pool name is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description } = req.body;

        const newPool = { name, description };

        try {
            const user = await User.findById(req.user.id);

            const areaIndex = user.data.area
                .map(item => item.id)
                .indexOf(req.params.areaId);

            user.data.area[areaIndex].pools.unshift(newPool);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/area/:areaId/:poolId
// @desc     Edit pool
// @access   Private
router.patch(
    '/:areaId/:poolId',
    [
        auth,
        [
            check('name', 'Pool name is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description } = req.body;

        const newPool = { name, description };

        try {
            const user = await User.findById(req.user.id);
            // Get update index
            const areaIndex = user.data.area
                .map(item => item.id)
                .indexOf(req.params.areaId);

            const poolIndex = user.data.area[areaIndex].pools
                .map(item => item.id)
                .indexOf(req.params.poolId);

            const updates = Object.keys(newPool);

            updates.forEach(
                update =>
                    (user.data.area[areaIndex].pools[poolIndex][update] =
                        newPool[update])
            );

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/area/:areaId/:poolId
// @desc     Delete pool
// @access   Private
router.delete('/:areaId/:poolId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const areaIndex = user.data.area
            .map(item => item.id)
            .indexOf(req.params.areaId);

        const poolIndex = user.data.area[areaIndex].pools
            .map(item => item.id)
            .indexOf(req.params.poolId);

        user.data.area[areaIndex].pools.splice(poolIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
