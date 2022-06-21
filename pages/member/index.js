import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import HeadTag from '../../src/containers/HeadTag';
import ContentHeader from '../../src/containers/ContentHeader';
import Tables from '../../src/components/Tables';

import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';

const {
    pathnameKey,
    renderWithoutValue,
    renderDateTime,
} = util;

//
const MemberList = ({ pageData }) => {

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

    // 表格欄位
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '信箱',
            dataIndex: 'email',
            render: (email) => renderWithoutValue(email),
        },
        {
            title: '姓名',
            dataIndex: 'realName',
            render: (realName) => renderWithoutValue(realName),
        },
        {
            title: '地址',
            dataIndex: 'address',
            render: (address) => renderWithoutValue(address),
        },
        {
            title: '註冊時間',
            dataIndex: 'createTime',
            render: (createTime) => renderDateTime(createTime),
        },
        {
            title: '已驗證?',
            dataIndex: 'emailVerified',
            render: (emailVerified) => <span className={emailVerified ? 'admin-order-status-success' : ''}>{emailVerified ? '是' : '--'}</span>,
            sorter: (a, b) => a.emailVerified - b.emailVerified,
        },
    ];

    return (

        <Fragment>
            <HeadTag title={pageData.title} />
            <ContentHeader title={pageData.title} />
            <Tables
                rowKey="id"
                columns={columns}
                data={pageData.data.list}
            />
        </Fragment>

    );

};

export default MemberList;

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
        url: '/admin_customers',
        cookie: req.cookies.admin_token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '會員列表',
                data: data.data,
            },
        },
    };

}
