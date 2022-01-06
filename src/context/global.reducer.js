// Global
const globalReducer = (state, { type, payload }) => {

    switch (type) {
        case 'global_data':
            return {
                ...state,
                user: payload.user,
                imagePosition: payload.imagePosition,
            };

        case 'page':
            return {
                ...state,
                page: payload,
            };

        case 'search':
            return {
                ...state,
                searchResult: payload,
            };

        default:
            return {
                ...state,
            };
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
