const express = require('express');
const validator = require('validator');
const Account = require('../../models/Account');
const auth = require('../../middleware/auth');
const router = new express.Router();
const { check, validationResult } = require('express-validator/check');

// @route    POST api/accounts/
// @desc     Create account
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('typeid', 'typeid is required')
                .not()
                .isEmpty(),
            check('classid', 'classid is required')
                .not()
                .isEmpty(),
            check('poolid', 'poolid is required')
                .not()
                .isEmpty(),
            check('name', 'Account Name is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (req.body.contacts) {
            req.body.contacts = req.body.contacts
                .split(',')
                .map(contact => contact.trim());
        }

        if (req.body.emails) {
            req.body.emails = req.body.emails
                .split(',')
                .map(email => email.trim())
                .filter(email => validator.isEmail(email));
        }

        const account = new Account({
            //todo: FRONTEND > typeid, classid, poolid should be sent ,
            ...req.body,
            owner: req.user.id
        });

        try {
            await account.save();
            res.status(201).json(account);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
);

// @route    GET api/accounts/
// @desc     Read all user account
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const accounts = await Account.find({ owner: req.user.id });

        res.json(accounts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// @route    GET api/accounts/:poolId
// @desc     Read all pool accounts
// @access   Private
router.get('/:poolId', auth, async (req, res) => {
    try {
        const accounts = await Account.find({
            owner: req.user.id,
            poolid: req.params.poolId
        });

        res.json(accounts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// @route    GET api/accounts/:id
// @desc     Read single account
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const account = await Account.findOne({
            owner: req.user.id,
            _id: req.params.id
        });

        res.json(account);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// @route    PATCH api/accounts/:id
// @desc     Update account
// @access   Private
router.patch(
    '/:id',
    [
        auth,
        [
            check('name', 'Account Name is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (req.body.contacts) {
            req.body.contacts = req.body.contacts
                .split(',')
                .map(contact => contact.trim());
        }

        if (req.body.emails) {
            req.body.emails = req.body.emails
                .split(',')
                .map(email => email.trim())
                .filter(email => validator.isEmail(email));
        }

        const account = await Account.findOneAndUpdate(
            { owner: req.user.id, _id: req.params.id },
            { $set: req.body },
            { new: true }
        );

        try {
            await account.save();
            res.json(account);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
);

// @route    DELETE api/accounts/:id
// @desc     Delete single account
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const account = await Account.findOneAndDelete({
            owner: req.user.id,
            _id: req.params.id
        });

        res.json(account);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
