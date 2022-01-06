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
    searchResult: {
        curr: '',
        list: [],
    },
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
        searchResult,
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
                    "key": "main",
                    "name": "詳細頁主圖"
                },
                {
                    "id": 4516,
                    "key": "mobileMain",
                    "name": "詳細頁主圖(手機版)"
                },
                {
                    "id": 4517,
                    "key": "thumb",
                    "name": "商品列表頁縮圖"
                },
                {
                    "id": 4518,
                    "key": "extend",
                    "name": "商品延伸圖(新品、你可能會喜歡)"
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
            searchResult,
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
