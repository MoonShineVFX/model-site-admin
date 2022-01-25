import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { blue } from '@ant-design/colors';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Buttons from '../Buttons';
import { ErrorMesg } from '../LightboxForm';
import UploadFiles from '../UploadFiles';
import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { uploadFileLimit } = util;
const { limitSizeText } = utilConst;

const mappingSize = {
    main: '1200x400',
    mobileMain: '640x213',
    thumb: '480x280',
    extend: '420x500',
};

const RowWrapLayout = styled.div({
    '.notice': {
        color: blue.primary,
    },
    '.other-fields': {
        display: 'inline-block',
        verticalAlign: 'top',
        marginLeft: '10px',
    },
    '.img-position': {
        display: 'inline-block',
        verticalAlign: 'top',
        marginRight: '10px',
    },
});

const PositionImageUpload = ({ data }) => {

    // Context
    const { imagePosition, formStorageData } = useContext(GlobalContext);

    // State
    const [imageLists, setImageLists] = useState(data?.webImages || []);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // 送資料
    const handleReqData = (reqData) => {

        const formData = new FormData();

        reqData = {
            ...reqData,
            productId: data.id,
            positionId: +reqData.positionId,
            file: formStorageData.selectedFile,
        };

        // 檢查圖片是否選取
        if (!reqData.file) {

            message.error('未選取圖片');
            return;

        }

        // 檢查: 圖片尺寸
        if (formStorageData?.selectedFile) {

            const limitSize = uploadFileLimit(reqData.file.size);

            // 檢查圖片大小是否超過 2MB
            if (!limitSize) {

                message.error(limitSizeText);
                return;

            }

        }

        for (let key in reqData) {

            formData.append(key, reqData[key]);

        }

        // Service
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
            <h3>前台圖片顯示區塊</h3>
            <div className="notice">
                建議尺寸:
                {
                    imagePosition.map(({ id, key, name }) => (

                        (key !== 'preview') &&
                            <div key={id}>{name}: {mappingSize[key]}</div>

                    ))
                }
            </div>

            <form onSubmit={handleSubmit(handleReqData)}>
                <UploadFiles
                    fileData={imageLists}
                    showPreview={true}
                    handleDelete={handleDelete}
                >
                    <span className={`img-position ${errors.positionId ? 'hasError' : ''}`}>
                        <select
                            name="positionId"
                            {...register('positionId', { required: true })}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <option value="">請選擇</option>
                            {
                                imagePosition.map(({ id, key, name }) => (

                                    (key !== 'preview') &&
                                        <option
                                            key={id}
                                            value={id}
                                        >
                                            {`${name} (${mappingSize[key]})`}
                                        </option>

                                ))
                            }
                        </select>

                        {errors.positionId && <ErrorMesg />}
                    </span>

                    <Buttons
                        text="送出"
                        htmlType="submit"
                        onClick={(e) => e.stopPropagation()}
                    />
                </UploadFiles>
            </form>
        </RowWrapLayout>

    );

};

PositionImageUpload.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PositionImageUpload;
