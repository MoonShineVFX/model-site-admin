import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Tables from '../../components/Tables';
import Buttons from '../../components/Buttons';
import LightboxForm from '../../components/LightboxForm';
import SearchForm from '../../components/admin/SearchForm';
import AdAccountForm from '../../components/admin/AdAccountForm';

import { GlobalContext } from '../../context/global.state';
import { AdAccountContext } from '../../context/admin/adaccount.state';
import util from '../../utils/util';
import utilConst from '../../utils/util.const';

const {
    pathnameKey,
    renderWithoutValue,
    renderDateTime,
} = util;

const { lightboxTitle } = utilConst;

const AdminAccountBase = ({ pageData }) => {

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

    const {
        action,
        list,
        adAccountDispatch,
    } = useContext(AdAccountContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname),
        });

        adAccountDispatch({
            type: 'adaccount_list',
            payload: pageData.data.list,
        });

    }, []);

    // 表格欄位
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '後台帳號',
            dataIndex: 'email',
            render: (email) => renderWithoutValue(email),
        },
        {
            title: '素材',
            dataIndex: 'isAssetAdmin',
            render: (isAssetAdmin) => isAssetAdmin && <DownOutlined />,
        },
        {
            title: '帳務',
            dataIndex: 'isFinanceAdmin',
            render: (isFinanceAdmin) => isFinanceAdmin && <DownOutlined />,
        },
        {
            title: '管理帳號',
            dataIndex: 'isSuperuser',
            render: (isSuperuser) => isSuperuser && <DownOutlined />,
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
                data={(searchResult?.curr === 'adAccount') ? searchResult.list : (action ? list : pageData.data.list)}
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

export default AdminAccountBase;

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

    const resData = await util.serviceServer({
        url: '/admin_accounts',
        cookie: req.cookies.token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '後台帳號設定',
                data: data.data,
            },
        },
    };

}
