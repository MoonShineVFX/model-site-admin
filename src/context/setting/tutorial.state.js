import { createContext, useContext, useReducer } from 'react';
import { tutorialReducer } from './tutorial.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/util.service';

// Init
const initState = {
    action: false,
    list: [],
    imageSize: '',
};

// Create Context
const TutorialContext = createContext(null);

// Provider
const TutorialProvider = ({ children }) => {

    // Context
    const { lightboxDispatch, formStorageDispatch } = useContext(GlobalContext);
    const [tutorialState, tutorialDispatch] = useReducer(tutorialReducer, initState);

    const { action, list, imageSize } = tutorialState;
    const { Provider } = TutorialContext;

    // 新增
    const tutorialCreate = (reqData) => {

        Service.tutorialCreate(reqData)
        .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        tutorialDispatch({ type: 'tutorial_create', payload: { resData, action: true } });

                    },
                });

            });

    };

    // 編輯
    const tutorialUpdate = (reqData) => {

        Service.tutorialUpdate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        tutorialDispatch({ type: 'tutorial_update', payload: { resData, action: true } });

                    },
                });

            });

    };

    return (

        <Provider value={{
            action,
            list,
            imageSize,

            tutorialCreate,
            tutorialUpdate,

            // Dispatch
            tutorialDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { TutorialProvider, TutorialContext };
