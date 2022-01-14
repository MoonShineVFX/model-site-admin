const adAccountReducer = (state, { type, payload }) => {

    switch (type) {
        case 'adaccount_list':
            return {
                ...state,
                list: payload,
            };

        case 'adaccount_create':
            return {
                ...state,
                action: payload.action,
                list: [...state.list, { ...payload.resData }],
            };

        case 'adaccount_update':
            return {
                ...state,
                action: payload.action,
                list: state.list.map((obj) => {

                    if (obj.id === payload.resData.id) obj = payload.resData;
                    return obj;

                }),
            };

        default:
            return { ...state };
    }

};

export { adAccountReducer };
