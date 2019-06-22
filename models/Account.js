const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        typeid: {
            type: String,
            required: true
        },
        classid: {
            type: String,
            required: true
        },
        poolid: {
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

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
