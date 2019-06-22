const express = require('express');
const validator = require('validator');
const Report = require('../../models/Report');
const auth = require('../../middleware/auth');
const router = new express.Router();
const { check, validationResult } = require('express-validator/check');

// @route    POST api/reports/
// @desc     Create report
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('parentid', 'parentid is required')
                .not()
                .isEmpty(),
            check('reporttype', 'reporttype is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty(),
            check('to', 'To date is required')
                .not()
                .isEmpty(),
            check('details', 'Report details should be array').isArray()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const report = new Report({
            //todo: FRONTEND > parentid, reporttype, from, to and array of item details should be sent
            ...req.body,
            owner: req.user.id
        });

        try {
            await report.save();
            res.status(201).json(report);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
);

// @route    GET api/reports/
// @desc     Read all user reports
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const reports = await Report.find({ owner: req.user.id });

        res.json(reports);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// @route    GET api/reports/:parentId
// @desc     Read all account reports
// @access   Private
router.get('/:parentId', auth, async (req, res) => {
    try {
        const reports = await Report.find({
            owner: req.user.id,
            parentid: req.params.parentId
        });

        res.json(reports);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// @route    GET api/reports/:id
// @desc     Read single report
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const report = await Report.findOne({
            owner: req.user.id,
            _id: req.params.id
        });

        res.json(report);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// @route    PATCH api/reports/:id
// @desc     Update report
// @access   Private
router.patch(
    '/:id',
    [auth, [check('details', 'Report details should be array').isArray()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const report = await Report.findOneAndUpdate(
            //todo: FRONTEND > parentid, reporttype, from, to and array of item details should be sent
            { owner: req.user.id, _id: req.params.id },
            { $set: req.body },
            { new: true }
        );

        try {
            await report.save();
            res.json(report);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
);

// @route    DELETE api/reports/:id
// @desc     Delete single report
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const report = await Report.findOneAndDelete({
            owner: req.user.id,
            _id: req.params.id
        });

        res.json(report);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
