import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import HeadTag from '../src/containers/HeadTag';
import ContentHeader from '../src/containers/ContentHeader';
import Tables from '../src/components/Tables';
import Links from '../src/components/Links';
import Buttons from '../src/components/Buttons';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import utilConst from '../src/utils/util.const';

const {
    pathnameKey,
    renderWithoutValue,
    renderDateTime,
    priceWithCommas,
} = util;

const { orderStatus, payment } = utilConst;

const OrderList = ({ pageData }) => {

    // Router
    const { pathname } = useRouter();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname),
        });

    }, []);

    // 表格欄位
    const columns = [
        {
            title: '編號(ID)',
            dataIndex: 'id',
        },
        {
            title: '訂單編號',
            dataIndex: 'orderNumber',
            render: (orderNumber) => (

                <Links
                    url={`/order/${orderNumber}`}
                    newPage
                >
                    {orderNumber}
                </Links>

            ),
        },
        {
            title: '會員帳號',
            dataIndex: 'account',
            render: (account) => renderWithoutValue(account),
        },
        {
            title: '金額',
            dataIndex: 'price',
            className: 'admin-order-price',
            sorter: (a, b) => a.price - b.price,
            render: (price) => priceWithCommas(price),
        },
        {
            title: '訂單狀態',
            dataIndex: 'status',
            sorter: (a, b) => a.status.length - b.status.length,
            render: (status) => <span className={`admin-order-status-${status}`}>{orderStatus[status]}</span>,
        },
        {
            title: '訂單成立時間',
            dataIndex: 'createdAt',
            render: (createdAt) => renderDateTime(createdAt),
        },
        {
            title: '付款時間',
            dataIndex: 'paidAt',
            render: (paidAt) => renderDateTime(paidAt),
        },
        {
            title: '付款方式',
            dataIndex: 'paidBy',
            sorter: (a, b) => a.paidBy.length - b.paidBy.length,
            render: (paidBy) => payment[paidBy],
        },
        {
            title: '交易序號',
            dataIndex: 'tradeNumber',
        },
        {
            title: '發票號碼',
            dataIndex: 'invoice',
        },
        {
            title: '操作',
            dataIndex: '',
            width: 120,
            render: ({ orderNumber }) => (

                <Buttons>
                    <Links
                        url={`/order/${orderNumber}`}
                        newPage
                    >
                        編輯
                    </Links>
                </Buttons>

            ),
        },
    ];

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                showButton={false}
            />

            <Tables
                rowKey="id"
                columns={columns}
                data={pageData.data.list}
            />
        </Fragment>

    );

};

export default OrderList;

export async function getServerSideProps ({ req }) {

    // 沒有 cookie(token) 導登入頁
    // if (!req.cookies.token) {

    //     return {
    //         redirect: {
    //             destination: '/login',
    //             permanent: false,
    //         },
    //     };

    // }

    // const resData = await util.serviceServer({
    //     url: '/admin_orders',
    //     cookie: req.cookies.token,
    // });

    // const { data } = resData;

    const resData = await fetch('http://localhost:1007/admin/json/order/orders.json');
    const data = await resData.json();

    return {
        props: {
            pageData: {
                title: '訂單管理',
                data: data.data,
            },
        },
    };

}