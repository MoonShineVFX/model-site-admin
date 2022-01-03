import { createContext, useContext, useReducer } from 'react';
import { message } from 'antd';
import { productReducer } from './product.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { productActiveStatus } = utilConst;

// Init
const initState = {
    action: false,
    imageSize: '',
    list: [],
};

// Create Context
const ProductContext = createContext(null);

// Provider
const ProductProvider = ({ children }) => {

    // Context
    const {
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const [productState, productDispatch] = useReducer(productReducer, initState);

    const { action, imageSize, list } = productState;
    const { Provider } = ProductContext;

    // 上下架
    const productActive = (reqData) => {

        message.success(`${reqData.id} 已改為${productActiveStatus[reqData.status]}`);

        return;
        Service.productActive(reqData)
            .then(() => {

                message.success(`${reqData.id} 已改為${productActiveStatus[reqData.status]}`);

            });

    };

    // 新增
    const productCreate = (reqData) => {

        Service.productCreate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        productDispatch({ type: 'product_create', payload: { resData, action: true } });

                    },
                });

            });

    };

    // 編輯
    const productUpdate = (reqData) => {

        Service.productUpdate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        productDispatch({ type: 'product_update', payload: { resData, action: true } });

                    },
                });

            });

    };

    // 刪除
    const productDelete = (id) => {

        Service.productDelete({ id: +id })
            .then(() => {

                Prompt('success', {
                    callback: () => {

                        productDispatch({ type: 'product_delete', payload: { id, action: true } });

                    },
                });

            });

    };

    return (

        <Provider value={{
            action,
            imageSize,
            list,

            productActive,
            productCreate,
            productUpdate,
            productDelete,

            // Dispatch
            productDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { ProductProvider, ProductContext };
