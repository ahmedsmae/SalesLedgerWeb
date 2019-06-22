const express = require('express');
const { check, validationResult } = require('express-validator/check');
const sharp = require('sharp');

const auth = require('../../../middleware/auth');
const User = require('../../../models/User');
const upload = require('../../../config/upload');

const router = express.Router();

// @route    PATCH api/users/profile/me
// @desc     Update profile
// @access   Private
router.patch(
    '/me',
    [
        auth,
        [
            check('name', 'Your name is required')
                .optional()
                .not()
                .isEmpty(),
            check('email', 'Please include a valid email')
                .optional()
                .isEmail(),
            check(
                'password',
                'Please enter a password with 7 or more characters'
            )
                .optional()
                .isLength({ min: 7 }),
            check('password', 'password cannot contains the word "password"')
                .optional()
                .isLowercase()
                .not()
                .contains('password'),
            check('skills', 'Skills is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            email,
            password,
            publicContacts,
            contacts, //todo: FRONTEND > to be sent as a single string with ,
            avatar,
            skills, //todo: FRONTEND > to be sent as a single string with ,
            bio,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body; // these are coming from the frontend

        // Build profile object
        const profileFields = {};
        if (name) profileFields.name = name;
        if (email) profileFields.email = email;
        if (password) profileFields.password = password;
        // create basic contacts object
        profileFields.contacts = {};
        if (publicContacts) profileFields.contacts.public = publicContacts;
        if (contacts) {
            profileFields.contacts.list = contacts
                .split(',')
                .map(contact => contact.trim());
        }
        if (avatar) profileFields.avatar = avatar;
        if (bio) profileFields.bio = bio;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // Build social object
        profileFields.social = {};
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (instagram) profileFields.social.instagram = instagram;
        if (youtube) profileFields.social.youtube = youtube;

        try {
            let user = await User.findById(req.user.id);

            if (!user) return res.status(400).json({ msg: 'User not found' });

            user = await User.findOneAndUpdate(
                { _id: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    POST api/users/profile/experience
// @desc     Add experience
// @access   Private
router.post(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty(),
            check('company', 'Company is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };

        try {
            const user = await User.findById(req.user.id);
            user.experience.unshift(newExp);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/profile/experience/:id
// @desc     Edit experience
// @access   Private
router.patch(
    '/experience/:id',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty(),
            check('company', 'Company is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };

        try {
            const user = await User.findById(req.user.id);
            // Get remove index
            const updateIndex = user.experience
                .map(item => item.id)
                .indexOf(req.params.id);

            const updates = Object.keys(newExp);

            updates.forEach(
                update =>
                    (user.experience[updateIndex][update] = newExp[update])
            );

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/profile/experience/:id
// @desc     Delete experience
// @access   Private
router.delete('/experience/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.experience
            .map(item => item.id)
            .indexOf(req.params.id);

        user.experience.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/users/profile/education
// @desc     Add education
// @access   Private
router.post(
    '/education',
    [
        auth,
        [
            check('school', 'School is required')
                .not()
                .isEmpty(),
            check('degree', 'Degree is required')
                .not()
                .isEmpty(),
            check('fieldofstudy', 'Field of study is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            location,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            location,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };

        try {
            const user = await User.findById(req.user.id);
            user.education.unshift(newEdu);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PATCH api/users/profile/education/:id
// @desc     Edit education
// @access   Private
router.patch(
    '/education/:id',
    [
        auth,
        [
            check('school', 'School is required')
                .not()
                .isEmpty(),
            check('degree', 'Degree is required')
                .not()
                .isEmpty(),
            check('fieldofstudy', 'Field of study is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            location,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            location,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };

        try {
            const user = await User.findById(req.user.id);
            // Get remove index
            const updateIndex = user.education
                .map(item => item.id)
                .indexOf(req.params.id);

            const updates = Object.keys(newEdu);

            updates.forEach(
                update => (user.education[updateIndex][update] = newEdu[update])
            );

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/users/profile/education/:id
// @desc     Delete education
// @access   Private
router.delete('/education/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Get remove index
        const removeIndex = user.education
            .map(item => item.id)
            .indexOf(req.params.id);

        user.education.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/users/profile/avatar
// @desc     Add/Edit profile avatar
// @access   Private
router.post(
    '/avatar',
    auth,
    upload.single('avatar'),
    async (req, res) => {
        const user = await User.findById(req.user.id);

        const buffer = await sharp(req.file.buffer)
            .resize({ width: 250, height: 250 })
            .png()
            .toBuffer();

        user.avatar = buffer;

        await user.save();
        res.json(user);
    },
    (error, req, res, next) => {
        // function designed to handle errors instead of the middleware
        res.status(400).send({ error: error.message });
    }
);

// @route    GET api/users/profile/avatar
// @desc     Get profile avatar
// @access   Private
router.get('/avatar', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || !user.avatar) {
            throw new Error('User not found or no avatar');
        }

        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

// @route    DELETE api/users/profile/avatar
// @desc     Delete profile avatar
// @access   Private
router.delete('/avatar', auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    user.avatar = undefined;
    await user.save();
    res.json(user);
});

module.exports = router;
