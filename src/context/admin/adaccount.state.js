import { createContext, useContext, useReducer } from 'react';
import { adAccountReducer } from './adaccount.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/util.service';

// Init
const initState = {
    action: false,
    list: [],
};

// Create Context
const AdAccountContext = createContext(null);

// Provider
const AdAccountProvider = ({ children }) => {

    // Context
    const { lightboxDispatch, formStorageDispatch } = useContext(GlobalContext);
    const [tagState, adAccountDispatch] = useReducer(adAccountReducer, initState);

    const { action, list } = tagState;
    const { Provider } = AdAccountContext;

    // 新增
    const adAccountCreate = (reqData) => {

        Service.adAccountCreate(reqData)
        .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        adAccountDispatch({ type: 'adaccount_create', payload: { resData, action: true } });

                    },
                });

            });

    };

    // 編輯
    const adAccountUpdate = (reqData) => {

        Service.adAccountUpdate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        adAccountDispatch({ type: 'adaccount_update', payload: { resData, action: true } });

                    },
                });

            });

    };

    return (

        <Provider value={{
            action,
            list,

            adAccountCreate,
            adAccountUpdate,

            // Dispatch
            adAccountDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { AdAccountProvider, AdAccountContext };
