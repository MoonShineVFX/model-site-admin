import { useContext, useEffect } from 'react';
import ActionWrap from '../../src/components/product/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';

// Mapping
const mappingCheckbox = (data, tags) => data.reduce((acc, curr) => {

    // 先找到對應的
    let temp = tags.find((obj) => obj.id === curr);
    acc[curr] = acc[curr] || {};
    acc[curr].isChecked = true;
    acc[curr].category = temp?.categoryKey;
    return acc;

}, {});

const ProductDetail = ({ pageData }) => {

    // Context
    const {
        globalDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'page', payload: '' });

        // formStorageDispatch({
        //     type: 'COLLECT',
        //     payload: {
        //         selected: mappingCheckbox(pageData.data.tags, newsTags),
        //         category: Object.keys(mappingCheckbox(pageData.data.tags, newsTags)).map((key) => mappingCheckbox(pageData.data.tags, newsTags)[key].category)[0],
        //     },
        // });

    }, []);

    return (

        <ActionWrap
            title={pageData.title}
            data={pageData.data}
            service="productUpdate"
        />

    );

};

export default ProductDetail;

export async function getServerSideProps ({ params, req }) {

    // 沒有 cookie(token) 導登入頁
    if (!req.cookies.token) {

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    }

    const resData = await util.serviceServer({
        method: 'get',
        url: `/admin_products/${params.id}`,
        cookie: req.cookies.token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '編輯商品',
                data: data.data,
            },
        },
    };

}
