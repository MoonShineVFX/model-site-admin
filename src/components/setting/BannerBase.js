import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image, Tooltip, message } from 'antd';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Tables from '../Tables';
import Buttons from '../Buttons';
import Links from '../Links';
import LightboxForm from '../LightboxForm';
import BannerForm from './BannerForm';

import { GlobalContext } from '../../context/global.state';
import { BannerContext } from '../../context/setting/banner.state';
import util from '../../utils/util';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { pathnameKey, renderDateTime } = util;
const { lightboxTitle, productActiveStatus } = utilConst;

const BannerBase = ({ pageData }) => {

    // Router
    const { pathname } = useRouter();

    // Context
    const {
        visible,
        currEvent,
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const {
        action,
        list,
        bannerDispatch,
    } = useContext(BannerContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname),
        });

        bannerDispatch({
            type: 'banner_list',
            payload: {
                list: pageData.data.list,
                imageSize: pageData.imageSize,
            },
        });

    }, []);

    // 表格欄位
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id, data) => <Links url="#" onClick={() => btnUpdate(data)}>{id}</Links>,
        },
        {
            title: `縮圖(${pageData.imageSize})`,
            dataIndex: 'imgUrl',
            width: 160,
            render: (imgUrl, { title }) => imgUrl ? <Image src={imgUrl} alt={title} /> : '--',
        },
        {
            title: '簡述',
            dataIndex: 'detail',
            width: 500,
            render: (detail) => detail ? <div dangerouslySetInnerHTML={{ __html: detail }} /> : '--',
        },
        {
            title: '外部連結',
            dataIndex: 'link',
            render: (link) => <Links url={link} newPage>{link}</Links>,
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
            filters: [
                {
                    text: '上架',
                    value: true,
                },
                {
                    text: '下架',
                    value: false,
                },
            ],
            onFilter: (value, { isActive }) => {

                const regex = new RegExp(`^${value}$`);
                return regex.test(isActive);

            },
        },
        {
            title: '上架時間',
            dataIndex: 'activeTime',
            render: (activeTime) => renderDateTime(activeTime),
            sorter: (a, b) => new Date(a.activeTime) - new Date(b.activeTime),
        },
        {
            title: '更新時間',
            dataIndex: 'updateTime',
            render: (updateTime, { updater }) => (

                updateTime ? (

                    <Tooltip
                        placement="bottomLeft"
                        title={`${updater} 編輯`}
                    >
                        {renderDateTime(updateTime)}
                    </Tooltip>

                ) : '--'

            ),
            sorter: (a, b) => new Date(a.updateTime) - new Date(b.updateTime),
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
    const btnCreate = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createBanner' });

    // 編輯按鈕
    const btnUpdate = (data) => {

        const {
            createTime,
            updateTime,
            creator,
            updater,
            ...rest
        } = data;

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateBanner' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: rest,
        });

    };

    // 上下架
    const handleChangeActive = ({ target }, id) => {

        Service.bannerActive({ id, isActive: (target.value === 'true') ? true : false })
            .then(() => {

                message.success(`ID: ${id} 已改為${productActiveStatus[target.value]}`);

            });

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

            {
                visible &&
                    <LightboxForm
                        width={700}
                        title={lightboxTitle[currEvent]}
                        visible={visible}
                        handleCancel={hideModal}
                    >
                        <BannerForm />
                    </LightboxForm>
            }
        </Fragment>

    );

};

export default BannerBase;
