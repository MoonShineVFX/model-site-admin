import { useContext, useEffect } from 'react';
import Cookie from 'js-cookie';
import { GlobalContext } from '../context/global.state';

const MainContent = ({ children }) => {

    // Context
    const { newsTags, getGlobalData } = useContext(GlobalContext);

    useEffect(() => {

        if (!Cookie.get('token')) return;
        if (!newsTags.length) getGlobalData();

    }, []);

    return <section className="section">{children}</section>;

};

export default MainContent;
