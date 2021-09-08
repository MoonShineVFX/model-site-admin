import { useContext } from 'react';

// Reducer
import { GlobalContext } from '../context/global.state';
// import { UserProvider } from '../context/users/users.state';

const Content = ({ Component, pageProps }) => {

    // Context
    const {
        page,
    } = useContext(GlobalContext);

    switch (page) {
        case 'users':
            return (
                // <UserProvider>
                    <Component {...pageProps} />
                // </UserProvider>
            );

        default:
            return <Component {...pageProps} />;
    }

};

export default Content;
