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
    const { searchResult, globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname, true),
        });

    }, []);

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                showButton={false}
            />

            <SearchForm options={pageData.data} />
            <DeftagForm data={(searchResult?.curr === 'deftag') ? searchResult.list : pageData.data} />
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
        url: '/admin_orders',
        cookie: req.cookies.admin_token,
    });

    const { data } = resData;

    // Fake
    var fake = {
        "zh": {
            "menu_store": "商店",
            "button_signin": "登入",
            "product_detail_format_and_renderer": "軟體格式與算圖引擎",
            "product_detail_notice": "購買後，可以在我的模型庫下載其他檔案格式"
        },
        "en": {
            "menu_store": "Store",
            "button_signin": "Sign",
            "product_detail_format_and_renderer": "Format And Renderer",
            "product_detail_notice": ""
        }
    };

    data.data = { ...fake };

    return {
        props: {
            pageData: {
                title: '詞條管理',
                data: data.data,
            },
        },
    };

}
