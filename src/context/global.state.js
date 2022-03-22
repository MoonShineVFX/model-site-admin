import React, { createContext, useReducer } from 'react';
import Service from '../utils/util.service';

import {
    globalReducer,
    formStorageReducer,
    lightboxReducer,
    deftagFormReducer,
} from './global.reducer';

// Global
const globalInitState = {
    page: '',
    user: {},
    tags: [],
    imagePosition: [],
    searchResult: {
        curr: '',
        list: [],
    },
    langCode: '',
};

// Form values
const formStorageInitState = {
    formStorageData: {},
};

// Lightbox
const lightboxInitState = {
    visible: false,
    currEvent: '',
};

const deftagFormInitState = {
    isShow: false,
    curr: '',
};

// Create Context
const GlobalContext = createContext(null);

// Provider
const GlobalProvider = ({ children }) => {

    const [globalState, globalDispatch] = useReducer(globalReducer, globalInitState);
    const [formStorageState, formStorageDispatch] = useReducer(formStorageReducer, formStorageInitState);
    const [lightboxState, lightboxDispatch] = useReducer(lightboxReducer, lightboxInitState);
    const [deftagFormState, deftagFormDispatch] = useReducer(deftagFormReducer, deftagFormInitState);
    const {
        page,
        user,
        tags,
        imagePosition,
        searchResult,
        langCode,
    } = globalState;

    const { formStorageData } = formStorageState;
    const { visible, currEvent } = lightboxState;
    const { isShow, curr } = deftagFormState;
    const { Provider } = GlobalContext;

    // 取得全域資料
    const getGlobalData = () => {

        Service.common()
            .then((resData) => {

                globalDispatch({
                    type: 'global_data',
                    payload: resData,
                });

            });

    };

    return (

        <Provider value={{
            // 全域資料
            page,
            user,
            tags,
            imagePosition,
            searchResult,
            langCode,
            getGlobalData,

            // Form 表單暫存
            formStorageData,

            // Lightbox
            visible,
            currEvent,

            // deftag form
            isShow,
            curr,

            // Dispatch
            globalDispatch,
            formStorageDispatch,
            lightboxDispatch,
            deftagFormDispatch,
        }}>
            {children}
        </Provider>

    );

};

export { GlobalContext, GlobalProvider };
