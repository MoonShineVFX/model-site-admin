import React, { createContext, useReducer } from 'react';
import Service from '../utils/util.service';

import {
    globalReducer,
    formStorageReducer,
    lightboxReducer,
} from './global.reducer';

// Global
const globalInitState = {
    page: '',
    user: {},
    imagePosition: [],
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

// Create Context
const GlobalContext = createContext(null);

// Provider
const GlobalProvider = ({ children }) => {

    const [globalState, globalDispatch] = useReducer(globalReducer, globalInitState);
    const [formStorageState, formStorageDispatch] = useReducer(formStorageReducer, formStorageInitState);
    const [lightboxState, lightboxDispatch] = useReducer(lightboxReducer, lightboxInitState);
    const {
        page,
        user,
        imagePosition,
    } = globalState;

    const { formStorageData } = formStorageState;
    const { visible, currEvent } = lightboxState;
    const { Provider } = GlobalContext;

    // 取得全域資料
    const getGlobalData = () => {

        let resData = {
            imagePosition: [
                {
                    "id": 4515,
                    "name": "main"
                },
                {
                    "id": 4516,
                    "name": "mobileMain"
                },
                {
                    "id": 4517,
                    "name": "thumb"
                },
                {
                    "id": 4518,
                    "name": "extend"
                }
            ]
        };

        globalDispatch({
            type: 'global_data',
            payload: resData,
        });

        return;
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
            imagePosition,
            getGlobalData,

            // Form 表單暫存
            formStorageData,

            // Lightbox
            visible,
            currEvent,

            // Dispatch
            globalDispatch,
            formStorageDispatch,
            lightboxDispatch,
        }}>
            {children}
        </Provider>

    );

};

export { GlobalContext, GlobalProvider };
