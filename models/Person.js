const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        titleid: {
            type: String,
            required: true
        },
        classid: {
            type: String,
            required: true
        },
        accountid: {
            type: String,
            required: true
        },
        persontype: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        contacts: {
            type: [String]
        },
        emails: {
            type: [String]
        },
        location: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
