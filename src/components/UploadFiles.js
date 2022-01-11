import React, { Fragment, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { red } from '@ant-design/colors';
import styled from 'styled-components';

import Buttons from './Buttons';
import FontIcon from './FontIcon';
import { GlobalContext } from '../context/global.state';
import util from '../utils/util';

const { renderBytesConvert } = util;
const supportFormat = '.jpg,.jpeg,.png';

// 整理成 Ant Design 的格式
const handleFileList = (files, array) => files.reduce((arr, { id, url, name, size, positionId }) => {

    let config = array.filter(({ id }) => id === positionId)[0];
    const obj = {
        uid: id,
        url,
        name,
        size,
        position: config?.name,
    };

    arr.push(obj);
    return arr;

}, []);

//
const UploadFilesNoticeLayout = styled.ul.attrs(() => ({
    className: 'upload-notice',
}))(({
    marginTop: '10px',
    '.warning-text': {
        color: red.primary,
    },
}));

// 上傳圖片按鈕
const ButtonsLayout = styled(Buttons)({
    fontSize: '14px',
    marginBottom: '20px',
    padding: '4px 16px',
    'span': {
        letterSpacing: '0',
    },
});

// 上傳圖片列表
const ListWrapLayout = styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    '> *': {
        flex: '1',
    },
    '.btnDelete': {
        maxWidth: '40px',
        fontSize: '1.4em',
        color: 'grey',
        'span': {
            display: 'inline-block',
            marginLeft: '-4px',
            padding: '2px 4px',
            cursor: 'pointer',
        },
    },
    '.imgWrap': {
        maxWidth: '320px',
        minWidth: '320px',
        border: `1px solid ${theme.palette.border}`,
        marginRight: '20px',
        padding: '8px',
        position: 'relative',
        cursor: 'pointer',
        '> *': {
            display: 'inline-block',
            verticalAlign: 'middle',
        },
    },
    '.thumb': {
        maxWidth: '80px',
        height: '80px',
        overflow: 'hidden',
    },
    '.fileInfo': {
        width: 'calc(100% - 80px - 8px)',
        paddingLeft: '8px',
    },
    '.name': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    '.size': {
        fontSize: '0.8em',
        color: 'grey',
    },
}));

//
const ListWrap = ({ file, handleClickEnlarge, handleDelete }) => (

    <ListWrapLayout>
        <div className="btnDelete">
            <span onClick={handleDelete}><FontIcon icon={faTrashAlt} /></span>
        </div>
        <div
            className="imgWrap"
            onClick={handleClickEnlarge}
            title={file.name}
        >
            <span className="thumb">
                <img
                    src={file.url}
                    alt={file.name}
                    title={file.name}
                    width="80"
                    height="80"
                />
            </span>
            <span className="fileInfo">
                <div className="name">{file.name}</div>
                <div className="size">檔案大小: {renderBytesConvert(file.size)}</div>
            </span>
        </div>
        <div>
            前台顯示位置:
            <p>{file.position}</p>
        </div>
    </ListWrapLayout>

);

//
const UploadFiles = ({
    listType,
    fileData,
    showPreview,
    handleUploadData,
    handleDelete,
    children,
}) => {

    // Context
    const { imagePosition, formStorageDispatch } = useContext(GlobalContext);

    // State
    const [beforePreview, setBeforePreview] = useState();

    // 上傳後預覽
    const handlePreview = async (file) => window.open(file.url);

    // 上傳前預覽
    const handleBeforeUpload = (file) => {

        setBeforePreview(file);
        formStorageDispatch({
            type: 'COLLECT',
            payload: { selectedFile: file },
        });

    };

    return (

        <Fragment>
            <UploadFilesNoticeLayout>
                <li className="warning-text">圖片經上傳後將取代原圖，請小心使用</li>
                <li className="warning-text">檔名請勿重複，以免被覆寫</li>
                <li>僅支援以下格式: {supportFormat}</li>
                <li>檔案大小不得超過 2MB</li>
            </UploadFilesNoticeLayout>

            <Upload
                listType={listType}
                accept={supportFormat} // 限制檔案格式
                fileList={handleFileList(fileData, imagePosition)}
                beforeUpload={handleBeforeUpload}
                customRequest={handleUploadData}
                onPreview={handlePreview}
                onRemove={handleDelete}
                {...(listType === 'picture') && {
                    itemRender: (originNode, file, currFileList, actions) => (

                        <ListWrap
                            file={file}
                            handleClickEnlarge={() => actions.preview()}
                            handleDelete={() => handleDelete(file)}
                        />

                    )
                }}
            >
                {
                    (listType === 'picture') ? (

                        <ButtonsLayout
                            type="default"
                            text="選擇圖片"
                            icon={<UploadOutlined />}
                        />

                    ) : (

                        <Fragment>
                            <PlusOutlined /> 上傳圖片
                        </Fragment>

                    )
                }

                <span className="other-fields">{children}</span>
            </Upload>

            {
                (showPreview && beforePreview) &&
                    <div>
                        <img
                            src={URL.createObjectURL(beforePreview)}
                            alt="thumb"
                        />
                    </div>
            }
        </Fragment>

    );

};

UploadFiles.defaultProps = {
    listType: 'picture',
    showPreview: false,
    handleUploadData: () => { return; },
};

UploadFiles.propTypes = {
    listType: PropTypes.string,
    fileData: PropTypes.array.isRequired,
    showPreview: PropTypes.bool,
    handleUploadData: PropTypes.func,
    handleDelete: PropTypes.func,
    children: PropTypes.any,
};

export default UploadFiles;
