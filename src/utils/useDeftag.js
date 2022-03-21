import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/global.state';

export default function useDeftag (component, visible = false) {

    // Context
    const {
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    // State
    // const [visible, setVisible] = useState(false);
    const [visiblity, setVisiblity] = useState(() => visible);

    useEffect(() => {

        console.log('useDeftag!!!');

    }, []);

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });
        // setVisible(true);

    };

    // 新增語系按鈕
    const clickLang = (code) => new Promise((resolve) => {

        console.log('code:', code)

        // lightboxDispatch({ type: 'SHOW', currEvent: 'updateLang' });
        // globalDispatch({ type: 'langCode', payload: code });
        setVisiblity(!visiblity);
        resolve();

    });

    return [clickLang];

}
