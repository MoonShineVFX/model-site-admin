import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image, Tooltip } from 'antd';

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

const { pathnameKey, renderDateTime } = util;
const { lightboxTitle } = utilConst;

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
        },
        {
            title: `縮圖(${pageData.imageSize})`,
            dataIndex: 'imgUrl',
            width: 160,
            render: (imgUrl, { title }) => imgUrl ? <Image src={imgUrl} alt={title} /> : '--',
        },
        {
            title: '簡述',
            dataIndex: 'description',
            width: 500,
            render: (description) => description ? <div dangerouslySetInnerHTML={{ __html: description }} /> : '--',
        },
        {
            title: '外部連結',
            dataIndex: 'link',
            render: (link) => <Links url={link} newPage>{link}</Links>,
        },
        {
            title: '變更者',
            dataIndex: 'updater',
            render: (updater, { updateTime }) => (

                updater ? (

                    <Tooltip
                        placement="bottomLeft"
                        title={`更新於 ${renderDateTime(updateTime)}`}
                    >
                        {updater}
                    </Tooltip>

                ) : '--'

            ),
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
