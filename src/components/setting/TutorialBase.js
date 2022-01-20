import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'antd';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Tables from '../Tables';
import Buttons from '../Buttons';
import Links from '../Links';
import LightboxForm from '../LightboxForm';
import TutorialForm from './TutorialForm';

import { GlobalContext } from '../../context/global.state';
import { TutorialContext } from '../../context/setting/tutorial.state';
import util from '../../utils/util';
import utilConst from '../../utils/util.const';

const {
    pathnameKey,
    renderWithoutValue,
    renderDateTime,
} = util;

const { lightboxTitle } = utilConst;

const TutorialBase = ({ pageData }) => {

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
        tutorialDispatch,
    } = useContext(TutorialContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname),
        });

        tutorialDispatch({
            type: 'tutorial_list',
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
            title: '文件標題',
            dataIndex: 'title',
            render: (title) => renderWithoutValue(title),
        },
        {
            title: '外部連結',
            dataIndex: 'link',
            render: (link) => <Links url={link} newPage>{link}</Links>,
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
    const btnCreate = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createTutorial' });

    // 編輯按鈕
    const btnUpdate = (data) => {

        const {
            createTime,
            updateTime,
            creator,
            updater,
            ...rest
        } = data;

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateTutorial' });
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
                        title={lightboxTitle[currEvent]}
                        visible={visible}
                        handleCancel={hideModal}
                    >
                        <TutorialForm />
                    </LightboxForm>
            }
        </Fragment>

    );

};

export default TutorialBase;
