// Global
const globalReducer = (state, { type, payload }) => {

    switch (type) {
        case 'page':
            return {
                ...state,
                page: payload,
            };

        case 'global_data':
            return {
                ...state,
                user: {
                    userId: payload.userId,
                    userName: payload.userName,
                },
                tags: payload.tags,
                imagePosition: payload.imagePosition,
            };

        case 'tags_update':
            return {
                ...state,
                tags: (payload.event === 'create') ? payload.tags : (

                    state.tags.map((obj) => {

                        if (obj.id === payload.resData.id) obj = payload.resData;
                        return obj;

                    })

                ),
            };

        case 'search':
            return {
                ...state,
                searchResult: payload,
            };

        default:
            return { ...state };
    }

};

// Form Fields
const formStorageReducer = (state, { type, payload }) => {

    switch (type) {
        case 'COLLECT':
            return {
                formStorageData: payload,
            };

        case 'CLEAR':
            return {
                formStorageData: {},
                file: {},
            };

        default:
            return state;
    }

};

// Lightbox
const lightboxReducer = (state, { type, currEvent }) => {

    switch (type) {
        case 'SHOW':
            return { visible: true, currEvent };

        case 'HIDE':
            return { visible: false, currEvent: '' };

        default:
            return { ...state, currEvent };
    }

};

export { globalReducer, formStorageReducer, lightboxReducer };
