const productReducer = (state, { type, payload }) => {

    switch (type) {
        case 'product_list':
            return {
                ...state,
                imageSize: payload.imageSize,
                list: payload.list,
            };

        case 'product_create':
            return {
                ...state,
                action: payload.action,
                list: [...state.list, { ...payload.resData }],
            };

        case 'product_update':
            return {
                ...state,
                action: payload.action,
                list: state.list.map((obj) => {

                    if (obj.id === payload.resData.id) obj = payload.resData;
                    return obj;

                }),
            };

        case 'product_delete':
            return {
                ...state,
                action: payload.action,
                list: state.list.filter(({ id }) => id !== payload.id),
            };

        default:
            return { ...state };
    }

};

export { productReducer };
