import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Tag } from 'antd';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Buttons from '../../../src/components/Buttons';
import LightboxFormStyle from '../LightboxFormStyle';

import TagForm from './TagForm';
import {
    ColLayout,
    TagFormLayout,
    UpdateTagFormLayout,
    TablesLayout,
} from './TagLayout';

import { GlobalContext } from '../../context/global.state';
import { TagContext } from '../../context/tag/tag.state';
import util from '../../utils/util';
import utilConst from '../../utils/util.const';

const { pathnameKey } = util;
const { lightboxTitle } = utilConst;

const TagBase = ({ pageData }) => {

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
        tagDispatch,
    } = useContext(TagContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname),
        });

        tagDispatch({
            type: 'tag_list',
            payload: pageData.data.list,
        });

    }, []);

    // 表格欄位
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '標籤名稱',
            dataIndex: 'name',
            render: (name) => name ? <Tag>{name}</Tag> : '--',
        },
        {
            title: '操作',
            dataIndex: '',
            width: 200,
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

    // 編輯按鈕
    const btnUpdate = ({ id, name }) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateTag' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: { id, name },
        });

    };

    return (

        <Fragment>
            <LightboxFormStyle />
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                showButton={false}
            />

            <Row gutter={20}>
                <Col flex="400px">
                    <TagFormLayout className="lightbox-wrap">
                        <TagForm />
                    </TagFormLayout>
                </Col>

                <ColLayout flex="1">
                    <TablesLayout
                        rowKey="id"
                        columns={columns}
                        data={action ? list : pageData.data.list}
                    />
                </ColLayout>
            </Row>

            {
                visible &&
                    <UpdateTagFormLayout
                        width="400"
                        title={lightboxTitle[currEvent]}
                        visible={visible}
                        handleCancel={hideModal}
                    >
                        <TagForm />
                    </UpdateTagFormLayout>
            }
        </Fragment>

    );

};

export default TagBase;
