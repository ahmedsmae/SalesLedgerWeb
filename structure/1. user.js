// ? Methods: POST GET DELETE
const user = {
    id: 'USER_ID AUTO_GENERATED',
    ////////////////////////////////////////////////////
    // ? Methods: PATCH
    name: 'Name',
    email: 'EMAIL',
    password: 'HASHED PASSWORD',
    // joindate: 'epoch',
    // tokens: [
    //     {
    //         token: {
    //             id: 'TOKEN_ID',
    //             token: 'TOKEN'
    //         }
    //     }
    // ],
    contacts: {
        public: false,
        list: ['CONTACT_ONE']
    },
    avatar: 'BINARY',
    skills: ['SKILL'],
    bio: 'EXTRA INFO',
    social: {
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: '',
        youtube: ''
    },
    ////////////////////////////////////////////////////
    // ? Methods: POST PATCH DELETE
    experiences: [
        {
            id: 'EXP_ID',
            title: '',
            company: '',
            location: '',
            from: 'epoch',
            to: 'epoch',
            current: false,
            description: ''
        }
    ],
    ////////////////////////////////////////////////////
    // ? Methods: POST PATCH DELETE
    educations: [
        {
            id: 'EDU_ID',
            school: '',
            location: '',
            degree: '',
            fieldofstudy: '',
            from: 'epoch',
            to: 'epoch',
            current: false,
            description: ''
        }
    ],
    ////////////////////////////////////////////////////
    data: {
        presets: {
            accounts: {
                ////////////////////////////////////////////////////
                // ? Methods: POST PATCH DELETE
                types: [
                    {
                        id: 'TYPE_ID',
                        accounttype: 'Street Pharmacy'
                    }
                ],
                ////////////////////////////////////////////////////
                // ? Methods: POST PATCH DELETE
                classes: [
                    {
                        id: 'CLASS_ID',
                        class: '***'
                    }
                ]
            },
            customers: {
                ////////////////////////////////////////////////////
                // ? Methods: POST PATCH DELETE
                titles: [
                    {
                        id: 'TITLE_ID',
                        title: 'General Practice'
                    }
                ],
                ////////////////////////////////////////////////////
                // ? Methods: POST PATCH DELETE
                classes: [
                    {
                        id: 'CLASS_ID',
                        class: 'BA'
                    }
                ]
            },
            colleagues: {
                ////////////////////////////////////////////////////
                // ? Methods: POST PATCH DELETE
                titles: [
                    {
                        id: 'TITLE_ID',
                        text: 'Sales Supervisor'
                    }
                ],
                ////////////////////////////////////////////////////
                // ? Methods: POST PATCH DELETE
                classes: [
                    {
                        id: 'CLASS_ID',
                        text: '***'
                    }
                ]
            },
            ////////////////////////////////////////////////////
            // ? Methods: POST PATCH DELETE
            taskTypes: [
                {
                    id: 'TASK_TYPE_ID',
                    text: 'Personal',
                    indicator: 'fff000'
                }
            ],
            ////////////////////////////////////////////////////
            // ? Methods: POST PATCH DELETE
            prices: [
                {
                    id: 'PRICE_ID',
                    name: 'ws',
                    currency: ''
                },
                {
                    id: 'PRICE_ID',
                    name: 'pub',
                    currency: ''
                },
                {
                    id: 'PRICE_ID',
                    name: 'ANY OTHER PRICE',
                    currency: ''
                }
            ]
        },
        ////////////////////////////////////////////////////
        // ? Methods: POST PATCH DELETE
        items: [
            {
                id: 'ITEM_ID',
                name: 'Zimax',
                hint: '250 mg Capsules',
                size: '6 Capsules',
                prices: [
                    {
                        priceid: 'PRICE_ID',
                        value: 50.51
                    }
                ],
                codes: ['CODE'],
                description: 'ITEM DESCRIPTION'
            }
        ],
        ////////////////////////////////////////////////////
        // ? Methods: POST PATCH DELETE
        area: [
            {
                id: 'AREA_ID',
                name: 'Sharjah',
                ////////////////////////////////////////////////////
                // ? Methods: POST PATCH DELETE
                pools: [
                    {
                        id: 'POOL_ID',
                        name: 'Shahba',
                        description: 'POOL DESCRIPTION'
                    }
                ],
                description: 'AREA DESCRIPTION'
            }
        ],
        ////////////////////////////////////////////////////
        // ? Methods: POST PATCH DELETE
        targets: [
            // ! should include dropdown list to choose the calculations price from PROFILE.PRESETS
            {
                id: 'TARGET_ID',
                title: '2019 OR June 2019 OR Q3 2019',
                from: 'epoch',
                to: 'epoch',
                // ! ONE TARGET REPORT ONLY SHOULD BE TRUE
                // ! ALL OTHERES SHOULD BE FALSE
                defaulttarget: true,
                peritem: [
                    {
                        itemid: 'ITEM_ID',
                        units: 10000,
                        budget: 50000
                    }
                ],
                description: 'TARGET REPORT DESCRIPTION'
            }
        ]
    }
};
