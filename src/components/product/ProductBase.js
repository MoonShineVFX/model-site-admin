import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image, Tag } from 'antd';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Tables from '../Tables';
import Links from '../Links';
import Buttons from '../Buttons';

import { GlobalContext } from '../../context/global.state';
import { ProductContext } from '../../context/product/product.state';
import util from '../../../src/utils/util';
import utilConst from '../../../src/utils/util.const';

const {
    pathnameKey,
    renderWithoutValue,
    renderDateTime,
    priceWithCommas,
} = util;

const { productActiveStatus } = utilConst;

//
const ProductBase = ({ pageData }) => {

    // console.log('pageData:', pageData)

    // Router
    const { pathname } = useRouter();

    // Context
    const {
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const {
        action,
        list,
        productActive,
        productDispatch,
    } = useContext(ProductContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname),
        });

        productDispatch({
            type: 'product_list',
            payload: {
                list: pageData.data.list,
                imageSize: pageData.imageSize,
            },
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
            className: 'col-thumb',
            width: 160,
            render: (imgUrl, { title }) => imgUrl ? <Image src={imgUrl} alt={title} /> : '--',
        },
        {
            title: '產品名稱',
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
            dataIndex: 'status',
            sorter: (a, b) => a.status.length - b.status.length,
            render: (status, { id }) => (

                <select
                    name="status"
                    defaultValue={status}
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
    const handleChangeActive = ({ target }, id) => productActive({ id, status: target.value });

    // 新增按鈕
    const btnCreate = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createProduct' });

    // 編輯按鈕
    const btnUpdate = (data) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateProduct' });
        formStorageDispatch({ type: 'COLLECT', payload: data });

    };

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                onClick={btnCreate}
            />

            <Tables
                rowKey="id"
                columns={columns}
                data={action ? list : pageData.data.list}
            />
        </Fragment>

    );

};

export default ProductBase;
