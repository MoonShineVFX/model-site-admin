import { Fragment, useContext, useEffect } from 'react';
import router, { useRouter } from 'next/router';
import { Image, Tag, message } from 'antd';

import HeadTag from '../src/containers/HeadTag';
import ContentHeader from '../src/containers/ContentHeader';
import Tables from '../src/components/Tables';
import Links from '../src/components/Links';
import Buttons from '../src/components/Buttons';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import utilConst from '../src/utils/util.const';
import Service from '../src/utils/util.service';

const {
    pathnameKey,
    renderWithoutValue,
    renderDateTime,
    priceWithCommas,
} = util;

const { productActiveStatus } = utilConst;

const ProductList = ({ pageData }) => {

    // Router
    const { pathname } = useRouter();

    // Context
    const {
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
            title: '編號(ID)',
            dataIndex: 'id',
            render: (id) => <Links url={`/product/${id}`}>{id}</Links>,
        },
        {
            title: `縮圖(${pageData.imageSize})`,
            dataIndex: 'imgUrl',
            width: 160,
            render: (imgUrl, { title }) => imgUrl ? <Image src={imgUrl} alt={title} /> : '--',
        },
        {
            title: '商品名稱',
            dataIndex: 'title',
            render: (title) => renderWithoutValue(title),
        },
        {
            title: '標籤',
            dataIndex: 'tags',
            className: 'col-tags',
            render: (tags) => (

                tags.length ? tags.map(({ id, name }) => <Tag key={id}>{name}</Tag>) : '--'

            ),
        },
        {
            title: '價格',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (price) => priceWithCommas(price),
        },
        {
            title: '狀態',
            dataIndex: 'isActive',
            render: (isActive, { id }) => (

                <select
                    name="isActive"
                    defaultValue={isActive}
                    onChange={(e) => handleChangeActive(e, id)}
                >
                    {
                        Object.keys(productActiveStatus).map((key) => (

                            <option
                                key={key}
                                value={key}
                            >
                                {productActiveStatus[key]}
                            </option>

                        ))
                    }
                </select>

            ),
        },
        {
            title: '上架時間',
            dataIndex: 'activeTime',
            render: (activeTime) => renderDateTime(activeTime),
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

    // 上下架
    const handleChangeActive = ({ target }, id) => {

        Service.productActive({ id, isActive: target.value })
            .then(() => {

                message.success(`${id} 已改為${productActiveStatus[target.value]}`);

            });

    };

    // 編輯按鈕
    const btnUpdate = (data) => {

        router.push(`/product/${data.id}`);
        lightboxDispatch({ type: 'SHOW', currEvent: 'updateProduct' });
        formStorageDispatch({ type: 'COLLECT', payload: data });

    };

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                showButton={false}
            >
                <Buttons className="btn-create">
                    <Links url="/product/create">新增</Links>
                </Buttons>
            </ContentHeader>

            <Tables
                rowKey="id"
                columns={columns}
                data={pageData.data.list}
            />
        </Fragment>

    );

};

export default ProductList;

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
    //     url: '/products',
    //     cookie: req.cookies.token,
    // });

    // const { data } = resData;

    const resData = await fetch('http://localhost:1007/admin/json/product/products.json');
    const data = await resData.json();

    return {
        props: {
            pageData: {
                title: '商品管理',
                imageSize: '321x186',
                data: data.data,
            },
        },
    };

}
