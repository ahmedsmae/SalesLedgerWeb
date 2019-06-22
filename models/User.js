const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7
        },
        joindate: {
            type: Date,
            default: Date.now
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ],
        contacts: {
            public: {
                type: Boolean,
                default: false
            },
            list: {
                type: [String]
            }
        },
        avatar: {
            type: Buffer
        },
        skills: {
            type: [String],
            required: true
        },
        bio: {
            type: String,
            trim: true
        },
        experience: [
            {
                title: {
                    type: String,
                    required: true,
                    trim: true
                },
                company: {
                    type: String,
                    required: true,
                    trim: true
                },
                location: {
                    type: String,
                    trim: true
                },
                from: {
                    type: Date,
                    required: true
                },
                to: {
                    type: Date
                },
                current: {
                    type: Boolean,
                    default: false
                },
                description: {
                    type: String,
                    trim: true
                }
            }
        ],
        education: [
            {
                school: {
                    type: String,
                    required: true,
                    trim: true
                },
                location: {
                    type: String,
                    trim: true
                },
                degree: {
                    type: String,
                    required: true,
                    trim: true
                },
                fieldofstudy: {
                    type: String,
                    required: true,
                    trim: true
                },
                from: {
                    type: Date,
                    required: true
                },
                to: {
                    type: Date
                },
                current: {
                    type: Boolean,
                    default: false
                },
                description: {
                    type: String,
                    trim: true
                }
            }
        ],
        social: {
            linkedin: {
                type: String,
                trim: true
            },
            twitter: {
                type: String,
                trim: true
            },
            facebook: {
                type: String,
                trim: true
            },
            instagram: {
                type: String,
                trim: true
            },
            youtube: {
                type: String,
                trim: true
            }
        },
        data: {
            presets: {
                accounts: {
                    types: [
                        {
                            accounttype: {
                                type: String,
                                required: true,
                                trim: true
                            }
                        }
                    ],
                    classes: [
                        {
                            class: {
                                type: String,
                                required: true,
                                trim: true
                            }
                        }
                    ]
                },
                customers: {
                    titles: [
                        {
                            title: {
                                type: String,
                                required: true,
                                trim: true
                            }
                        }
                    ],
                    classes: [
                        {
                            class: {
                                type: String,
                                required: true,
                                trim: true
                            }
                        }
                    ]
                },
                colleagues: {
                    titles: [
                        {
                            title: {
                                type: String,
                                required: true,
                                trim: true
                            }
                        }
                    ],
                    classes: [
                        {
                            class: {
                                type: String,
                                required: true,
                                trim: true
                            }
                        }
                    ]
                },
                tasktypes: [
                    {
                        tasktype: {
                            type: String,
                            required: true,
                            trim: true
                        },
                        indicator: {
                            type: String,
                            required: true,
                            trim: true
                        }
                    }
                ],
                prices: [
                    {
                        name: {
                            type: String,
                            required: true,
                            trim: true
                        },
                        currency: {
                            type: String,
                            required: true,
                            trim: true
                        }
                    }
                ]
            },
            items: [
                {
                    name: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    hint: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    size: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    prices: [
                        {
                            priceid: {
                                type: String,
                                required: true
                            },
                            value: {
                                type: Number,
                                required: true,
                                trim: true
                            }
                        }
                    ],
                    codes: {
                        type: [String]
                    },
                    description: {
                        type: String,
                        trim: true
                    }
                }
            ],
            area: [
                {
                    name: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    pools: [
                        {
                            name: {
                                type: String,
                                required: true,
                                trim: true
                            },
                            description: {
                                type: String,
                                trim: true
                            }
                        }
                    ],
                    description: {
                        type: String,
                        trim: true
                    }
                }
            ],
            targets: [
                {
                    title: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    from: {
                        type: Date,
                        required: true
                    },
                    to: {
                        type: Date,
                        required: true
                    },
                    defaulttarget: {
                        type: Boolean,
                        default: false
                    },
                    peritem: [
                        {
                            itemid: {
                                type: String,
                                required: true
                            },
                            units: {
                                type: Number,
                                required: true,
                                trim: true
                            },
                            budget: {
                                type: Number,
                                required: true,
                                trim: true
                            }
                        }
                    ],
                    description: {
                        type: String,
                        trim: true
                    }
                }
            ]
        }
    },
    { timestamps: true }
);

// this method to return only the data we need to send back to the frontend
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

// this method will live in the instances ONLY =  not the User model
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const payload = { _id: user._id.toString() };
    const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: config.get('tokenExpiration')
    });

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

// create our own methods for the User model
// this method lives in the User model itself = Not in it's instances
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    // user the same message fo all credentials errors - don't be too specific
    const msg = 'Invalid Credentials';

    if (!user) {
        throw new Error(msg);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error(msg);
    }

    return user;
};

// This to hash the password before save() user
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// remove user entries after deleting themselves
userSchema.post('remove', async function(next) {
    const user = this;

    // todo: delete all user entries as below
    // await Task.deleteMany({ owner: user._id })

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
