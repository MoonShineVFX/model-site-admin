import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col } from 'antd';

import HeadTag from '../../src/containers/HeadTag';
import ContentHeader from '../../src/containers/ContentHeader';
import {
    BackToLayout,
    DetailWrapLayout,
    InfoWrapLayout,
    ProductItemLayout,
} from '../../src/components/order/OrderLayout';

import Links from '../../src/components/Links';
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

const OrderDetail = ({ pageData }) => {

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

    const {
        id,
        orderNumber,
        tradeNumber,
        account,
        price,
        status,
        paidBy,
        createdAt,
        paidAt,
        invoice,
        products,
    } = pageData.data;

    return (

        <Fragment>
            <HeadTag title={`訂單 ${pageData.data.orderNumber}`} />

            <ContentHeader
                title={`${pageData.title} - ${pageData.data.orderNumber}`}
                showButton={false}
            >
                <BackToLayout type="default">
                    <Links url="/order">回前頁</Links>
                </BackToLayout>
            </ContentHeader>

            <DetailWrapLayout gutter={60}>
                <Col span={12}>
                    <InfoWrapLayout>
                        <div className="info-row">
                            <h4 className="title">ID:</h4>
                            <div>{id}</div>
                        </div>
                        <div className="info-row">
                            <h4 className="title">訂單編號:</h4>
                            <div>{orderNumber}</div>
                        </div>
                        <div className="info-row">
                            <h4 className="title">會員帳號:</h4>
                            <div>{account}</div>
                        </div>
                        <div className="info-row">
                            <h4 className="title">商品件數:</h4>
                            <div className="package">{products.length}件</div>
                        </div>
                        <div className="info-row admin-order-price">
                            <h4 className="title">訂單金額:</h4>
                            <div>{priceWithCommas(price)}</div>
                        </div>
                        <div className="info-row">
                            <h4 className="title">訂單狀態:</h4>
                            <div className={`admin-order-status-${status}`}>{orderStatus[status]}</div>
                        </div>
                        <div className="info-row">
                            <h4 className="title">訂單成立時間:</h4>
                            <div>{renderDateTime(createdAt)}</div>
                        </div>
                        <div className="info-row">
                            <h4 className="title">付款時間:</h4>
                            <div>{renderDateTime(paidAt)}</div>
                        </div>
                        <div className="info-row">
                            <h4 className="title">付款方式:</h4>
                            <div>{renderWithoutValue(payment[paidBy])}</div>
                        </div>
                        <div className="info-row">
                            <h4 className="title">交易序號:</h4>
                            <div>{renderWithoutValue(tradeNumber)}</div>
                        </div>
                        <div className="info-row">
                            <h4 className="title">發票號碼:</h4>
                            <div>{renderWithoutValue(invoice)}</div>
                        </div>
                    </InfoWrapLayout>
                </Col>

                <Col span={12}>
                    <h3>商品內容</h3>
                    <ProductItemLayout>
                        {
                            products.map(({ id, title, price, imgUrl }) => (

                                <Links
                                    key={id}
                                    url={`/product/${id}`}
                                    className="item"
                                    newPage
                                >
                                    <div className="thumb">
                                        <img
                                            src={imgUrl}
                                            alt={title}
                                            width="480"
                                            height="280"
                                        />
                                    </div>
                                    <div className="content">
                                        <div className="title">{title}</div>
                                        <div className="price">{priceWithCommas(price)}</div>
                                    </div>
                                </Links>

                            ))
                        }
                    </ProductItemLayout>
                </Col>
            </DetailWrapLayout>
        </Fragment>

    );

};

export default OrderDetail;

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
        url: `/admin_orders/${params.id}`,
        cookie: req.cookies.admin_token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '訂單詳細',
                data: data.data,
            },
        },
    };

}
