const bannerReducer = (state, { type, payload }) => {

    switch (type) {
        case 'banner_list':
            return {
                ...state,
                ...payload,
            };

        case 'banner_create':
            return {
                ...state,
                action: payload.action,
                list: [...state.list, { ...payload.resData }],
            };

        case 'banner_update':
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

export { bannerReducer };
