import React, { Fragment, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Upload, Modal } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
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
        key: config?.name,
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
        letterSpacing: 0,
    },
});

// 上傳圖片列表
const ListWrapLayout = styled.div(({ theme }) => ({
    display: 'flex',
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
        maxWidth: '60px',
        height: '60px',
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
const ListWrap = ({ file, onClick }) => {

    // Context
    const { imagePosition } = useContext(GlobalContext);

    return (

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
                        width="60"
                        height="60"
                    />
                </div>
                <div className="fileInfo">
                    <div>{file.name}</div>
                    <div className="size">檔案大小: {formatBytes(file.size)}</div>
                </div>
            </div>
            <div>
                <div>前台顯示位置: {file.key}</div>
                <select
                    name="imagePosition"
                    onChange={(e) => console.log('target', e.target.value)}
                >
                    <option value="">請選擇</option>
                    {
                        imagePosition.map(({ id, name }) => (

                            <option
                                key={id}
                                value={id}
                            >
                                {name}
                            </option>

                        ))
                    }
                </select>
            </div>
        </ListWrapLayout>

    );

};

//
const UploadFiles = ({
    size,
    fileData,
    handleUploadData,
    handleRemove,
}) => {

    // Context
    const { imagePosition } = useContext(GlobalContext);

    // State
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    // Preview
    const handlePreview = async (file) => {

        if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj);

        setPreviewVisible(true);
        setPreviewImage(file.url || file.preview);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

    };

    // Cancel
    const handleCancel = () => setPreviewVisible(false);

    return (

        <Fragment>
            <GlobalStyle />

            <Upload
                accept=".jpg,.jpeg,.png,.gif" // 限制檔案格式
                fileList={handleFileList(fileData, imagePosition)}
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
                    text="上傳檔案"
                    icon={<UploadOutlined />}
                />
            </Upload>

            <UploadFilesNoticeLayout>
                <li className="warning-text">圖片經上傳後將取代原圖，請小心使用</li>
                <li className="warning-text">檔名請勿重複，以免被覆寫</li>
                <li>僅支援以下格式: jpg, png</li>
                <li>檔案大小不得超過 2MB</li>
                {
                    size && <li>圖片尺寸為: {size}</li>
                }
            </UploadFilesNoticeLayout>

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

UploadFiles.propTypes = {
    size: PropTypes.string,
    fileData: PropTypes.array.isRequired,
    handleUploadData: PropTypes.func,
    handleRemove: PropTypes.func,
};

export default UploadFiles;
