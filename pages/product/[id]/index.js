import { useContext, useEffect } from 'react';
import ActionWrap from '../../../src/components/product/ActionWrap';
import { GlobalContext } from '../../../src/context/global.state';
import util from '../../../src/utils/util';

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
        method: 'get',
        url: `/admin_products/${params.id}`,
        cookie: req.cookies.admin_token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: data.data.title,
                data: data.data,
            },
        },
    };

}
