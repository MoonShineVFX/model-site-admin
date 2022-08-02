import { useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { blue } from '@ant-design/colors';
import styled from 'styled-components';

import Buttons from '../Buttons';
import UploadFiles from '../UploadFiles';

import util from '../../utils/util';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { uploadFileLimit } = util;
const { limitSizeText } = utilConst;

const RowWrapLayout = styled.div(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.border}`,
    marginTop: '40px',
    paddingTop: '40px',
    '.notice': {
        color: blue.primary,
    },
}));

const PreviewImageUpload = ({ data }) => {

    // State
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [imageLists, setImageLists] = useState(data?.previews || []);
    const [fileList, setFileList] = useState([]);

    // 上傳前置
    const handleBeforeUpload = (file, fileList ) => {

        const limitSize = uploadFileLimit(file.size);

        if (!limitSize) {

            message.error(limitSizeText);
            return;

        }

        setDisabled(false);
        setFileList(fileList);

        return false;

    };

    // 上傳圖片: 多張
    const handleUploadData = () => {

        const formData = new FormData();
        formData.append('productId', data.id);

        for (let i = 0; i < fileList.length; i++) {

            formData.append('files', fileList[i]);

        }

        setLoading(true);

        Service.imagePreviewUpload(formData)
            .then(({ list }) => setImageLists(list))
            .finally(() => {

                setDisabled(true);
                setLoading(false);

            });

    };

    // 刪除圖片
    const handleDelete = (file) => {

        Service.imageDelete({ id: file.uid })
            .then(() => setImageLists(imageLists.filter(({ id }) => id !== file.uid)));

    };

    return (

        <RowWrapLayout className="row">
            <h3>商品展示組圖</h3>
            <p className="notice">建議尺寸: 840x480</p>

            <UploadFiles
                listType="picture-card"
                fileData={imageLists}
                beforeUpload={handleBeforeUpload}
                handleDelete={handleDelete}
                multiple
            />

            <Buttons
                text={loading ? '上傳中...' : '上傳'}
                loading={loading}
                disabled={disabled}
                onClick={handleUploadData}
            />
        </RowWrapLayout>

    );

};

PreviewImageUpload.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PreviewImageUpload;
