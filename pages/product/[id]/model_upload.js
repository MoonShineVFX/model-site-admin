import { Fragment, useContext, useEffect } from 'react';
import HeadTag from '../../../src/containers/HeadTag';
import ContentHeader from '../../../src/containers/ContentHeader';
import ModelUploadForm from '../../../src/components/model/ModelUploadForm';
import { GlobalContext } from '../../../src/context/global.state';
import util from '../../../src/utils/util';

const ModelUpload = ({ pageData }) => {

    // Context
    const { globalDispatch, formStorageDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'page', payload: '' });
        formStorageDispatch({ type: 'CLEAR' });

    }, [globalDispatch, formStorageDispatch]);

    return (

        <Fragment>
            <HeadTag title={pageData.title} />
            <ContentHeader title={pageData.data.productName} />

            <ModelUploadForm data={pageData.data} />
        </Fragment>

    );

};

export default ModelUpload;

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

    // 取得商品名稱
    const product = await util.serviceServer({
        method: 'get',
        url: `/admin_products/${params.id}`,
        cookie: req.cookies.admin_token,
    });

    // 取得軟體格式與算圖引擎
    // const resData = await util.serviceServer({
    //     url: `/admin_products/${params.id}`,
    //     cookie: req.cookies.admin_token,
    // });

    const fake = {
        "format": [
            {
                "id": 111,
                "name": "FBX"
            }
        ],
        "renderer": [
            {
                "id": 22,
                "name": "Vray"
            }
        ]
    }

    return {
        props: {
            pageData: {
                title: '模型上傳',
                data: {
                    productName: product.data.data.title,
                    ...fake,
                    // ...resData.data,
                },
            },
        },
    };

}
