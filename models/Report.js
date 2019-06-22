const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        parentid: {
            type: String,
            required: true
        },
        reporttype: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        details: [
            {
                itemid: {
                    type: String,
                    required: true
                },
                stock: {
                    type: Number
                },
                movement: {
                    type: Number
                },
                order: {
                    type: Number
                },
                bonus: {
                    type: Number
                },
                value: {
                    type: Number
                }
            }
        ],
        feedback: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
