import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image, Tooltip, message } from 'antd';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Tables from '../Tables';
import Buttons from '../Buttons';
import ButtonsLang from '../ButtonsLang';
import Links from '../Links';
import LightboxForm from '../LightboxForm';
import BannerForm from './BannerForm';
import DeftagDataForm from '../DeftagDataForm';

import { GlobalContext } from '../../context/global.state';
import { BannerContext } from '../../context/setting/banner.state';
import util from '../../utils/util';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const {
    pathnameKey,
    renderDateTime,
    renderWithoutValue,
} = util;

const { lightboxTitle, activeStatus } = utilConst;

const BannerBase = ({ pageData }) => {

    // Router
    const { pathname } = useRouter();

    // Context
    const {
        visible,
        currEvent,
        isShow,
        deftag,
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
                mobileImageSize: pageData.mobileImageSize,
            },
        });

    }, []);

    // 表格欄位
    const columns = [
        {
            title: 'ID (商品ID)',
            dataIndex: 'id',
            width: 120,
            render: (id, data) => (

                <Fragment>
                    <Links url="#" onClick={() => btnUpdate(data)}>{id}</Links> (<Links url={`/product/${data.productId}`} newPage>{data.productId}</Links>)
                </Fragment>
            ),
        },
        {
            title: `大圖(${pageData.imageSize})`,
            dataIndex: 'imgUrl',
            width: 160,
            render: (imgUrl, { title }) => imgUrl ? <Image src={imgUrl} alt={title} /> : '--',
        },
        {
            title: `小圖(${pageData.mobileImageSize})`,
            dataIndex: 'mobileImgUrl',
            width: 160,
            render: (mobileImgUrl, { title }) => mobileImgUrl ? <Image src={mobileImgUrl} alt={title} /> : '--',
        },
        {
            title: '標題',
            dataIndex: 'title',
            render: (title) => renderWithoutValue(title),
        },
        {
            title: '簡述',
            dataIndex: 'description',
            render: (description) => renderWithoutValue(description),
        },
        {
            title: '狀態',
            dataIndex: 'isActive',
            render: (isActive, { id }) => (

                <select
                    name="isActive"
                    value={isActive}
                    onChange={(e) => handleChangeActive(e, id)}
                >
                    {
                        Object.keys(activeStatus).map((key) => (

                            <option
                                key={key}
                                value={key}
                            >
                                {activeStatus[key]}
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
            render: (data, { id }) => (

                <Fragment>
                    <Buttons
                        text="編輯"
                        onClick={() => btnUpdate(data)}
                    />
                    <ButtonsLang id={id} />
                </Fragment>

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
            activeTime,
            inactiveTime,
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
            .then((resData) => {

                message.success(`ID: ${id} 已改為${activeStatus[resData.isActive]}`);
                bannerDispatch({
                    type: 'banner_update',
                    payload: { resData, action: true },
                });

            });

    };

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                onClick={btnCreate}
                showButton
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

            {
                // 語系表單
                isShow &&
                    <DeftagDataForm
                        handleFetchData={() => Service.bannerDeftag({ id: deftag.id })}
                        handleUpdateData={Service.bannerUpdate}
                    />
            }
        </Fragment>

    );

};

export default BannerBase;
