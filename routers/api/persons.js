const express = require('express');
const validator = require('validator');
const Person = require('../../models/Person');
const auth = require('../../middleware/auth');
const router = new express.Router();
const { check, validationResult } = require('express-validator/check');

// @route    POST api/persons/
// @desc     Create person
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('titleid', 'titleid is required')
                .not()
                .isEmpty(),
            check('classid', 'classid is required')
                .not()
                .isEmpty(),
            check('accountid', 'accountid is required')
                .not()
                .isEmpty(),
            check('persontype', 'persontype is required')
                .not()
                .isEmpty(),
            check('name', 'Name is required')
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

        const person = new Person({
            //todo: FRONTEND > titleid, classid, accountid, persontype should be sent ,
            ...req.body,
            owner: req.user.id
        });

        try {
            await person.save();
            res.status(201).json(person);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
);

// @route    GET api/persons/
// @desc     Read all user persons
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const persons = await Person.find({ owner: req.user.id });

        res.json(persons);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// @route    GET api/persons/:accountId
// @desc     Read all account persons
// @access   Private
router.get('/:accountId', auth, async (req, res) => {
    try {
        const persons = await Person.find({
            owner: req.user.id,
            accountid: req.params.accountId
        });

        res.json(persons);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// @route    GET api/persons/:id
// @desc     Read single person
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const person = await Person.findOne({
            owner: req.user.id,
            _id: req.params.id
        });

        res.json(person);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// @route    PATCH api/persons/:id
// @desc     Update person
// @access   Private
router.patch(
    '/:id',
    [
        auth,
        [
            check('name', 'Name is required')
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

        const person = await Person.findOneAndUpdate(
            //todo: FRONTEND > titleid, classid, accountid, persontype should be sent ,
            { owner: req.user.id, _id: req.params.id },
            { $set: req.body },
            { new: true }
        );

        try {
            await person.save();
            res.json(person);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
);

// @route    DELETE api/persons/:id
// @desc     Delete single person
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const person = await Person.findOneAndDelete({
            owner: req.user.id,
            _id: req.params.id
        });

        res.json(person);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
