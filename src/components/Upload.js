import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { UploadOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';
import styled from 'styled-components';
import Buttons from './Buttons';
import { GlobalContext } from '../context/global.state';

//
const UploadSingleLayout = styled.div.attrs(() => ({
    className: 'fileUploadWrap',
}))(({ theme }) => ({
    '.upload-action': {
        marginBottom: '12px',
    },
    'input': {
        display: 'none',
    },
    '.info': {
        cursor: 'default',
    },
    '.size': {
        color: '#bfbfbf',
        float: 'right',
        marginTop: 'calc((34px - 22px) / 2)',
    },
    '.upload-preview': {
        height: '190px',
        textAlign: 'center',
        border: `1px solid ${theme.palette.border}`,
        padding: '8px',
        '&:before': {
            content: "''",
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'middle',
        },
        'img': {
            maxHeight: '100%',
            maxWidth: '100%',
        },
    },
    '.upload-notice': {
        marginTop: '4px',
    },
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

// 圖片預覽
const ImgPreview = ({ url }) => <img src={url} alt="thumb" />;

// 單張
const UploadSingle = ({ size }) => {

    // Context
    const {
        formStorageData,
        formStorageDispatch,
    } = useContext(GlobalContext);

    // State
    const [imgPreview, setImgPreview] = useState(null);

    // Ref
    const inputFileRef = useRef(null);

    //
    const handleChangeInput = ({ target }) => {

        if (target.files && target.files.length) {

            setImgPreview(target.files[0]);
            formStorageDispatch({
                type: 'COLLECT',
                payload: {
                    ...formStorageData,
                    file: target.files[0],
                },
            });

        }

    };

    // 觸發 input file
    const handleTriggerUpload = () => inputFileRef.current.click();

    return (

        <UploadSingleLayout>
            <div className="upload-action">
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleChangeInput}
                    ref={inputFileRef}
                />

                <ButtonsLayout
                    type="default"
                    text="上傳圖片"
                    icon={<UploadOutlined />}
                    onClick={handleTriggerUpload}
                />

                {
                    imgPreview &&
                        <span className="info">
                            <span>{imgPreview.name}</span>
                            <span className="size">
                                {
                                    // 小於 1MB 顯示 KB
                                    (imgPreview.size / 1024 / 1024 > 1) ?
                                        `${Math.round((imgPreview.size / 1024 / 1024) * 100) / 100} MB` :
                                        `${Math.round((imgPreview.size / 1024) * 100) / 100} KB`
                                }
                            </span>
                        </span>
                }
            </div>

            <div className="upload-preview">
                <ImgPreview
                    url={imgPreview ? URL.createObjectURL(imgPreview) : formStorageData?.imgUrl}
                />
            </div>

             <ul className="upload-notice">
                <li className="warning-text">圖片經上傳後將取代原圖，請小心使用</li>
                <li className="warning-text">檔名請勿重複，以免被覆寫</li>
                <li>僅支援以下格式: jpg, png</li>
                <li>檔案大小不得超過 5MB</li>
                <li>圖片尺寸為: {size}</li>
            </ul>
        </UploadSingleLayout>

    );

};

UploadSingle.propTypes = {
    size: PropTypes.string, // 1200x520
    multiple: PropTypes.bool, // 1200x520
};

export default UploadSingle;
