const tagReducer = (state, { type, payload }) => {

    switch (type) {
        case 'tag_list':
            return {
                ...state,
                list: payload,
            };

        case 'tag_create':
            return {
                ...state,
                action: payload.action,
                list: payload.tags,
            };

        case 'tag_update':
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

export { tagReducer };
