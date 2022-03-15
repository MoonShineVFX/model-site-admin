import { createContext, useContext, useReducer } from 'react';
import { bannerReducer } from './banner.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/util.service';

// Init
const initState = {
    action: false,
    list: [],
    imageSize: '',
    mobileImageSize: '',
};

// Create Context
const BannerContext = createContext(null);

// Provider
const BannerProvider = ({ children }) => {

    // Context
    const { lightboxDispatch, formStorageDispatch } = useContext(GlobalContext);
    const [bannerState, bannerDispatch] = useReducer(bannerReducer, initState);

    const { action, list, imageSize, mobileImageSize } = bannerState;
    const { Provider } = BannerContext;

    // 新增
    const bannerCreate = (reqData) => {

        Service.bannerCreate(reqData)
        .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        bannerDispatch({ type: 'banner_create', payload: { resData, action: true } });

                    },
                });

            });

    };

    // 編輯
    const bannerUpdate = (reqData) => {

        Service.bannerUpdate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        bannerDispatch({ type: 'banner_update', payload: { resData, action: true } });

                    },
                });

            });

    };

    return (

        <Provider value={{
            action,
            list,
            imageSize,
            mobileImageSize,

            bannerCreate,
            bannerUpdate,

            // Dispatch
            bannerDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { BannerProvider, BannerContext };
