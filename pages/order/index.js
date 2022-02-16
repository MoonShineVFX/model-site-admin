import { Fragment, useContext, useEffect } from 'react';
import router, { useRouter } from 'next/router';

import HeadTag from '../../src/containers/HeadTag';
import ContentHeader from '../../src/containers/ContentHeader';
import Tables from '../../src/components/Tables';
import Links from '../../src/components/Links';
import Buttons from '../../src/components/Buttons';
import SearchForm from '../../src/components/order/SearchForm';

import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import utilConst from '../../src/utils/util.const';

const {
    pathnameKey,
    renderWithoutValue,
    renderDateTime,
    priceWithCommas,
} = util;

const { orderStatus, payment } = utilConst;

const antdTableFilter = (data) => Object.keys(data).reduce((acc, key) => {

    const obj = { text: data[key], value: key };
    acc.push(obj);
    return acc;

}, []);

//
const OrderList = ({ pageData }) => {

    // Router
    const { pathname } = useRouter();

    // Context
    const { searchResult, globalDispatch } = useContext(GlobalContext);

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
            title: '訂單編號',
            dataIndex: 'orderNumber',
            render: (orderNumber) => <Links url={`/order/${orderNumber}`}>{orderNumber}</Links>,
            sorter: (a, b) => {

                if (b.orderNumber < a.orderNumber) return -1;
                if (b.orderNumber > a.orderNumber) return 1;
                return 0;

            },
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
            render: (price) => priceWithCommas(price),
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: '訂單狀態',
            dataIndex: 'status',
            render: (status) => <span className={`admin-order-status-${status}`}>{orderStatus[status]}</span>,
            filters: antdTableFilter(orderStatus),
            onFilter: (value, { status }) => {

                const regex = new RegExp(`^${value}$`);
                return regex.test(status);

            },
        },
        {
            title: '訂單成立時間',
            dataIndex: 'createdAt',
            render: (createdAt) => renderDateTime(createdAt),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: '付款時間',
            dataIndex: 'paidAt',
            render: (paidAt) => renderDateTime(paidAt),
            sorter: (a, b) => new Date(a.paidAt) - new Date(b.paidAt),
        },
        {
            title: '付款方式',
            dataIndex: 'paidBy',
            render: (paidBy) => renderWithoutValue(payment[paidBy]),
            sorter: (a, b) => a.paidBy.length - b.paidBy.length,
        },
        {
            title: '交易序號',
            dataIndex: 'tradeNumber',
            render: (tradeNumber) => renderWithoutValue(tradeNumber),
        },
        {
            title: '發票號碼',
            dataIndex: 'invoice',
            render: (invoice) => renderWithoutValue(invoice),
        },
        {
            title: '操作',
            dataIndex: '',
            width: 120,
            render: ({ orderNumber }) => (

                <Buttons
                    type="default"
                    text="檢視"
                    onClick={() => router.push(`/order/${orderNumber}`)}
                />

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

            <SearchForm />

            <Tables
                rowKey="id"
                columns={columns}
                data={(searchResult?.curr === 'order') ? searchResult.list : pageData.data.list}
            />
        </Fragment>

    );

};

export default OrderList;

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
        url: '/admin_orders',
        cookie: req.cookies.admin_token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '訂單管理',
                data: data.data,
            },
        },
    };

}
