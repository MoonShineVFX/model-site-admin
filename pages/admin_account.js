import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';

import HeadTag from '../src/containers/HeadTag';
import ContentHeader from '../src/containers/ContentHeader';
import Tables from '../src/components/Tables';
import Links from '../src/components/Links';
import Buttons from '../src/components/Buttons';
import LightboxForm from '../src/components/LightboxForm';
import SearchForm from '../src/components/admin/SearchForm';
import AdAccountForm from '../src/components/admin/AdAccountForm';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import utilConst from '../src/utils/util.const';
import Service from '../src/utils/util.service';

const {
    pathnameKey,
    renderWithoutValue,
    renderDateTime,
} = util;

const { lightboxTitle } = utilConst;

const AdminAccount = ({ pageData }) => {

    // Router
    const { pathname } = useRouter();

    // Context
    const {
        visible,
        currEvent,
        searchResult,
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname),
        });

    }, []);

    // 表格欄位
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <Links url={`/product/${id}`}>{id}</Links>,
        },
        {
            title: '後台帳號',
            dataIndex: 'account',
            render: (account) => renderWithoutValue(account),
        },
        {
            title: '素材',
            dataIndex: 'handleMaterial',
            render: (handleMaterial) => handleMaterial && <DownOutlined />,
        },
        {
            title: '帳務',
            dataIndex: 'handleFinance',
            render: (handleFinance) => handleFinance && <DownOutlined />,
        },
        {
            title: '管理帳號',
            dataIndex: 'isMax',
            render: (isMax) => isMax && <DownOutlined />,
        },
        {
            title: '更動時間',
            dataIndex: 'updateTime',
            render: (updateTime) => renderDateTime(updateTime),
        },
        {
            title: '操作',
            dataIndex: '',
            width: 120,
            render: (data) => (

                <Buttons
                    text="編輯"
                    onClick={() => btnUpdate(data)}
                />
            ),
        },
    ];

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    // 新增按鈕
    const btnCreate = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createAdAccount' });

    // 編輯按鈕
    const btnUpdate = (data) => {

        const { createTime, updateTime, ...rest } = data;

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateAdAccount' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: rest,
        });

    };

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                onClick={btnCreate}
            />

            <SearchForm />

            <Tables
                rowKey="id"
                columns={columns}
                data={(searchResult?.curr === 'adAccount') ? searchResult.list : pageData.data.list}
            />

            {
                visible &&
                    <LightboxForm
                        title={lightboxTitle[currEvent]}
                        visible={visible}
                        handleCancel={hideModal}
                    >
                        <AdAccountForm />
                    </LightboxForm>
            }
        </Fragment>

    );

};

export default AdminAccount;

export async function getServerSideProps ({ req }) {

    // 沒有 cookie(token) 導登入頁
    if (!req.cookies.token) {

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    }

    // const resData = await util.serviceServer({
    //     url: '/admin_products',
    //     cookie: req.cookies.token,
    // });

    // const { data } = resData;

    const resData = await fetch('http://localhost:1007/admin/json/admin_account.json');
    const data = await resData.json();

    return {
        props: {
            pageData: {
                title: '後台帳號設定',
                data: data.data,
            },
        },
    };

}
