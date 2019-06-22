const forecast = {
    id: 'FORECAST_ID',
    userId: 'USER_ID',
    from: 'epoch',
    to: 'epoch',
    title: 'June 2019',
    notes: 'FORECAST NOTES',
    targetId: 'TARGET_ID',
    // ! there will be a dropdown list to select the target to compare with and get TARGET_ID
    // ! should include dropdown list to choose the calculations price from PROFILE.PRESETS
    details: [
        {
            id: 'ITEM_ID',
            accounts: [
                {
                    id: 'ACCOUNT_ID',
                    units: 150
                }
            ]
        }
    ]
    // forecast will calculate automatically the sales and values within the same from to period
};
