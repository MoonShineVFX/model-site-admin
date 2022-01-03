import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Modal } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';
import styled from 'styled-components';
import Buttons from './Buttons';

// Base64
function getBase64 (file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);

    });

}

//
const UploadFilesNoticeLayout = styled.ul.attrs(() => ({
    className: 'upload-notice',
}))(({
    marginTop: '10px',
    '.warning-text': {
        color: red.primary,
    },
}));

//
const ButtonsLayout = styled(Buttons)({
    fontSize: '14px',
    marginRight: '12px',
    padding: '4px 16px',
    'span': {
        letterSpacing: 0,
    },
});

// 整理成 Ant Design 的格式
const handleFileList = (files, type) => files.reduce((arr, curr) => {

    const obj = {
        uid: curr.id,
        url: (type === 'image') ? curr.imgUrl : curr.url,
        ...(type === 'file') && { name: curr.name },
    };

    arr.push(obj);
    return arr;

}, []);

//
const UploadFiles = ({
    type,
    size,
    fileData,
    handleUploadData,
    handleRemove,
}) => {

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
            <Upload
                listType={(type === 'image') ? 'picture-card' : 'text'}
                accept={(type === 'image') ? '.jpg,.jpeg,.png,.gif' : ''} // 限制檔案格式
                fileList={handleFileList(fileData, type)}
                customRequest={handleUploadData}
                onRemove={handleRemove}
                {...(type === 'image') && { onPreview: handlePreview }}
            >
                {
                    (type === 'image') ? (

                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>上傳圖片</div>
                        </div>

                    ) : (

                        <ButtonsLayout
                            type="default"
                            text="上傳檔案"
                            icon={<UploadOutlined />}
                        />

                    )
                }
            </Upload>

            <UploadFilesNoticeLayout>
                <li className="warning-text">圖片經上傳後將取代原圖，請小心使用</li>
                <li className="warning-text">檔名請勿重複，以免被覆寫</li>
                {
                    (type === 'image') &&
                        <Fragment>
                            <li>僅支援以下格式: jpg, png</li>
                            <li>檔案大小不得超過 5MB</li>
                            <li>圖片尺寸為: {size}</li>
                        </Fragment>
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

UploadFiles.defaultProps = {
    type: 'image',
};

UploadFiles.propTypes = {
    type: PropTypes.string,
    size: PropTypes.string,
    fileData: PropTypes.array.isRequired,
    handleUploadData: PropTypes.func,
    handleRemove: PropTypes.func,
};

export default UploadFiles;
