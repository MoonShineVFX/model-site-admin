import React, { Fragment, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// export async function getStaticProps () {

//     const res = await util.serviceServer('api/user/userList');
//     const { data } = res;

//     if (!data.result) {

//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         };

//     }

//     return {
//         props: { data: data.data }, // will be passed to the page component as props
//     };

// };

const Home = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Context
    // const { globalDispatch } = useContext(GlobalContext);
    // const { pathname } = useRouter();

    // useEffect(() => {

    //     globalDispatch({
    //         type: 'PAGE',
    //         payload: util.pathnameKey(pathname),
    //     });

    // }, [globalDispatch, pathname]);

    return (

        <Fragment>
            <h3>This is Home~</h3>
            <Link href="/login">
                <a>Login page</a>
            </Link>
        </Fragment>

    );

};

export default Home;

/**
 * antd with styled-component
 * https://codesandbox.io/s/8x1r670rxj?file=/src/index.js
 */
