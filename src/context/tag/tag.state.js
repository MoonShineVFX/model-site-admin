import { createContext, useContext, useReducer } from 'react';
import { tagReducer } from './tag.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/util.service';

// Init
const initState = {
    action: false,
    list: [],
};

// Create Context
const TagContext = createContext(null);

// Provider
const TagProvider = ({ children }) => {

    // Context
    const {
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const [tagState, tagDispatch] = useReducer(tagReducer, initState);

    const { action, list } = tagState;
    const { Provider } = TagContext;

    // 新增
    const tagCreate = (reqData) => {

        Service.tagCreate(reqData)
            .then(({ tags }) => {

                formStorageDispatch({ type: 'CLEAR' });
                tagDispatch({ type: 'tag_create', payload: { tags, action: true } });
                globalDispatch({ type: 'tags_update', payload: { tags, event: 'create' } });

            });

    };

    // 編輯
    const tagUpdate = (reqData) => {

        Service.tagUpdate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        tagDispatch({ type: 'tag_update', payload: { resData, action: true } });
                        globalDispatch({ type: 'tags_update', payload: { resData, event: 'update' } });

                    },
                });

            });

    };

    return (

        <Provider value={{
            action,
            list,

            tagCreate,
            tagUpdate,

            // Dispatch
            tagDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { TagProvider, TagContext };
