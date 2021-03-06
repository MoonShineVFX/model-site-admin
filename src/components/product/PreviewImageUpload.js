import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { blue } from '@ant-design/colors';
import styled from 'styled-components';
import UploadFiles from '../UploadFiles';
import { GlobalContext } from '../../context/global.state';
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

    // Context
    const { imagePosition } = useContext(GlobalContext);

    // State
    const [imageLists, setImageLists] = useState(data?.previews || []);

    // 上傳圖片
    const handleUploadData = ({ file }) => {

        const limitSize = uploadFileLimit(file.size);
        const formData = new FormData();

        if (!limitSize) {

            message.error(limitSizeText);
            return;

        }

        formData.append('productId', data.id);
        formData.append('positionId', imagePosition.filter(({ key }) => key === 'preview')[0].id);
        formData.append('file', file);

        Service.imageUpload(formData)
            .then((resData) => setImageLists([{ ...resData }, ...imageLists]));

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
                handleUploadData={handleUploadData}
                handleDelete={handleDelete}
            />
        </RowWrapLayout>

    );

};

PreviewImageUpload.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PreviewImageUpload;
