import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeadTag from '../../src/containers/HeadTag';
import ContentHeader from '../../src/containers/ContentHeader';
import SearchForm from '../../src/components/deftag/SearchForm';
import DeftagForm from '../../src/components/deftag/DeftagForm';
import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';

const { pathnameKey } = util;

//
const DeftagList = ({ pageData }) => {

    // Router
    const { pathname } = useRouter();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname, true),
        });

    }, []);

    return (

        <Fragment>
            <HeadTag title={pageData.title} />
            <ContentHeader title={pageData.title} />
            <SearchForm />
            <DeftagForm data={pageData.data} />
        </Fragment>

    );

};

export default DeftagList;

export async function getServerSideProps ({ req }) {

    // 沒有 cookie(admin_token) 導登入頁
    if (!req.cookies.admin_token) {

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    }

    const resData = await util.serviceServer({
        url: '/lang_configs',
        cookie: req.cookies.admin_token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '詞條管理',
                data: data.data,
            },
        },
    };

}
