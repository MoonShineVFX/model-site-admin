import { useContext, useEffect } from 'react';
import ActionWrap from '../../src/components/product/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';

const ProductDetail = ({ pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'page', payload: '' });

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
