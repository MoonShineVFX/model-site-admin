import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Buttons from '../Buttons';
import { ErrorMesg } from '../LightboxForm';
import UploadFiles from '../UploadFiles';
import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';

const RowWrapLayout = styled.div({
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

const ImageUpload = ({ data }) => {

    // fake
    // data.webImages = [
    //     {
    //         "id": 48,
    //         "url": "https://storage.googleapis.com/backend-django/demonstrations/images/5G實驗場.jpg",
    //         "positionId": 2,
    //         "name": "圖片檔名01",
    //         "size": 20000
    //     },
    //     {
    //         "id": 49,
    //         "url": "https://storage.googleapis.com/backend-django/demonstrations/images/5G實驗場.jpg",
    //         "positionId": 3,
    //         "name": "圖片檔名02",
    //         "size": 20000
    //     }
    // ];

    console.log('image data:', data)

    // Context
    const { imagePosition, formStorageData } = useContext(GlobalContext);

    // State
    const [imageLists, setImageLists] = useState(data?.webImages || []);
    const [beforePreview, setBeforePreview] = useState(true);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // 上傳圖片
    const handleUploadData = ({ file }) => {

        const isLt10M = file.size / 1024 / 1024 < 10;
        const formData = new FormData();

        if (!isLt10M) {

            message.error('檔案不能超過 2MB，請重新上傳!!!');
            return;

        }

        formData.append('productId', data.id);
        formData.append('file', file);

        let resData = {
            id: 84751,
            url: 'https://fakeimg.pl/321x186',
            key: 'thumb',
            name: "321x186",
            size: 20000
        };

        setImageLists([{ ...resData }, ...imageLists]);
        return;
        Service.imageUpload(formData)
            .then((resData) => setImageLists([{ ...resData }, ...imageLists]));

    };

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

            const limitSize = (reqData.file.size / 1024 / 1024) < 2;

            // 檢查圖片大小是否超過 2MB
            if (!limitSize) {

                message.error('檔案不能超過 2MB，請重新上傳');
                return;

            }

        }

        for (let key in reqData) {

            formData.append(key, reqData[key]);

        }

        // Service
        Service.imageUpload(formData)
            .then((resData) => {

                // fake
                resData = {
                    "id": 50,
                    "url": "https://storage.googleapis.com/backend-django/demonstrations/images/5G實驗場.jpg",
                    "positionId": 4,
                    "name": "圖片檔名03",
                    "size": 20000
                };

                // setBeforePreview(false);
                setImageLists([{ ...resData }, ...imageLists]);

            });

    };

    return (

        <RowWrapLayout className="row">
            <h3>前台圖片顯示區塊</h3>

            <form onSubmit={handleSubmit(handleReqData)}>
                <UploadFiles
                    fileData={imageLists}
                    // handleUploadData={handleUploadData}
                    showPreview={beforePreview}
                >
                    <span className={`img-position ${errors.positionId ? 'hasError' : ''}`}>
                        <select
                            name="positionId"
                            {...register('positionId', { required: true })}
                            onClick={(e) => e.stopPropagation()}
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

ImageUpload.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ImageUpload;
