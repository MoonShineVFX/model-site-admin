import { useContext, useEffect } from 'react';
import ActionWrap from '../../src/components/product/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';

const ProductCreate = ({ pageData }) => {

    // Context
    const { globalDispatch, formStorageDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'page', payload: '' });
        formStorageDispatch({ type: 'CLEAR' });

    }, [globalDispatch, formStorageDispatch]);

    return (

        <ActionWrap
            title={pageData.title}
            service="productCreate"
        />

    );

};

export default ProductCreate;

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

    return {
        props: {
            pageData: {
                title: '新增商品',
            },
        },
    };

}
