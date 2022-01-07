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

    console.log('betty:', req.cookies)

    // 沒有 cookie(token) 導登入頁
    if (!req.cookies.token) {

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
