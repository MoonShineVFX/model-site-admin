import { useContext, useEffect } from 'react';
import Cookie from 'js-cookie';
import { GlobalContext } from '../context/global.state';

const MainContent = ({ children }) => {

    // Context
    const { getGlobalData } = useContext(GlobalContext);

    useEffect(() => {

        if (!Cookie.get('admin_token')) return;
        getGlobalData();

    }, []);

    return <section className="section">{children}</section>;

};

export default MainContent;
