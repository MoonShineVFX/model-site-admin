const tutorialReducer = (state, { type, payload }) => {

    switch (type) {
        case 'tutorial_list':
            return {
                ...state,
                ...payload,
            };

        case 'tutorial_create':
            return {
                ...state,
                action: payload.action,
                list: [...state.list, { ...payload.resData }],
            };

        case 'tutorial_update':
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

export { tutorialReducer };
