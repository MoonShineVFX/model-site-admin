import React, { Fragment, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';
import styled from 'styled-components';
import GlobalStyle from '../containers/GlobalStyle';
import { GlobalContext } from '../context/global.state';

import Buttons from './Buttons';
import util from '../utils/util';

const { formatBytes } = util;

// Base64
function getBase64 (file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);

    });

}

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
    '> *': {
        flex: '1',
    },
    '.imgWrap': {
        maxWidth: '300px',
        border: `1px solid ${theme.palette.border}`,
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px',
        marginBottom: '10px',
        padding: '8px',
        position: 'relative',
        cursor: 'pointer',
        '> *': {
            flex: '1',
        },
    },
    '.thumb': {
        maxWidth: '80px',
        height: '80px',
        overflow: 'hidden',
    },
    '.fileInfo': {
        paddingLeft: '8px',
    },
    '.size': {
        fontSize: '0.8em',
        color: 'grey',
    },
}));

//
const ListWrap = ({ file, onClick }) => (

    <ListWrapLayout>
        <div
            className="imgWrap"
            onClick={onClick}
        >
            <div className="thumb">
                <img
                    src={file.url}
                    alt={file.name}
                    title={file.name}
                    width="80"
                    height="80"
                />
            </div>
            <div className="fileInfo">
                <div>{file.name}</div>
                <div className="size">檔案大小: {formatBytes(file.size)}</div>
            </div>
        </div>
        <div>
            前台顯示位置:
            <p>{file.position}</p>
        </div>
    </ListWrapLayout>

);

//
const UploadFiles = ({
    size,
    fileData,
    showPreview,
    handleUploadData,
    handleRemove,
    children,
}) => {

    // Context
    const { imagePosition, formStorageDispatch } = useContext(GlobalContext);

    // State
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [beforePreview, setBeforePreview] = useState();

    // 上傳後預覽
    const handlePreview = async (file) => {

        if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj);

        setPreviewVisible(true);
        setPreviewImage(file.url || file.preview);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

    };

    // Cancel
    const handleCancel = () => setPreviewVisible(false);

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
            <GlobalStyle />

            <UploadFilesNoticeLayout>
                <li className="warning-text">圖片經上傳後將取代原圖，請小心使用</li>
                <li className="warning-text">檔名請勿重複，以免被覆寫</li>
                <li>僅支援以下格式: jpg, png</li>
                <li>檔案大小不得超過 2MB</li>
                {
                    size && <li>圖片尺寸為: {size}</li>
                }
            </UploadFilesNoticeLayout>

            <Upload
                accept=".jpg,.jpeg,.png,.gif" // 限制檔案格式
                fileList={handleFileList(fileData, imagePosition)}
                beforeUpload={handleBeforeUpload}
                customRequest={handleUploadData}
                onPreview={handlePreview}
                // onRemove={handleRemove}
                itemRender={(originNode, file, currFileList, actions) => (

                    <ListWrap
                        file={file}
                        onClick={() => actions.preview()}
                    />

                )}
            >
                <ButtonsLayout
                    type="default"
                    text="選擇圖片"
                    icon={<UploadOutlined />}
                />

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

            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    src={previewImage}
                    alt="圖片放大"
                    style={{ width: '100%' }}
                />
            </Modal>
        </Fragment>

    );

};

UploadFiles.defaultProps = {
    handleUploadData: () => { return; },
    showPreview: false,
};

UploadFiles.propTypes = {
    size: PropTypes.string,
    fileData: PropTypes.array.isRequired,
    handleUploadData: PropTypes.func,
    handleRemove: PropTypes.func,
};

export default UploadFiles;
