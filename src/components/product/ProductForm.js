import { Fragment, useContext, useState } from 'react';
import { message, Row, Col } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import LightboxFormStyle from '../LightboxFormStyle';
import Buttons from '../Buttons';
import UploadSingle from '../Upload';
import UploadFiles from '../UploadFiles';
import { FormRow, ErrorMesg } from '../LightboxForm';
import { FormWrap } from './ProductFormLayout';

import { GlobalContext } from '../../context/global.state';
import { ProductContext } from '../../context/product/product.state';
import utilConst from '../../utils/util.const';

const { productActiveStatus } = utilConst;

const RowUpload = styled.div.attrs(() => ({
    className: 'row row-upload',
}))({
    marginTop: '30px',
    marginBottom: '40px',
});

const ProductForm = ({ data }) => {

    // console.log('data:', data)

    // Context
    const {
        currEvent,
        formStorageData,
        formStorageDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // const {
    //     productCreate,
    //     productUpdate,
    // } = useContext(ProductContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: { ...data },
    });

    // State
    const [imageLists, setImageLists] = useState(data.images);

    // 送資料
    const handleReqData = (reqData) => {

        const formData = new FormData();

        reqData = {
            ...reqData,
            ...formStorageData?.file && { file: formStorageData?.file },
            priority: +reqData.priority,
        };

        // 檢查: 圖片尺寸
        if (formStorageData?.file) {

            const limitSize = (reqData.file.size / 1024 / 1024) < 5;

            // 檢查圖片大小是否超過 5MB
            if (!limitSize) {

                message.error('檔案不能超過 5MB，請重新上傳');
                return;

            }

        }

        for (let key in reqData) {

            formData.append(key, reqData[key]);

        }

        // if (currEvent === 'updateProduct') productUpdate(formData);
        // else productCreate(formData);

    };

    // 上傳圖片
    const handleUploadData = ({ file }, type = 'image') => {

        const isLt10M = file.size / 1024 / 1024 < 10;
        const formData = new FormData();

        if (!isLt10M) {

            message.error('檔案不能超過 2MB，請重新上傳!!!');
            return;

        }

        formData.append('demoPlaceId', data.id);
        formData.append('file', file);

        let resData = {
            id: 84751,
            url: 'https://fakeimg.pl/321x186',
            key: 'thumb',
            name: "321x186",
            size: 20000
        };

        setImageLists([{ ...resData }, ...imageLists]);

        // Service.imageUpload(formData)
        //     .then((resData) => {

        //         if (type === 'image') setImageLists([...imageLists, { ...resData }]);
        //         else setFileLists([...fileLists, { ...resData }]);

        //     });

    };

    return (

        <Fragment>
            <LightboxFormStyle />

            <FormWrap onSubmit={handleSubmit(handleReqData)}>
                {(currEvent === 'updateProduct') && <p>id: {data.id}</p>}

                <Row>
                    <Col flex={1}>
                        <div className="items">
                            <FormRow
                                labelTitle="產品名稱"
                                required={true}
                                error={errors.title && true}
                            >
                                <input
                                    type="text"
                                    name="title"
                                    {...register('title', { required: true })}
                                />
                            </FormRow>

                            <div className={`row ${errors.status ? 'hasError' : ''}`}>
                                <div className="title isRequired">產品狀態 (必填)</div>
                                <div className="field noBorder">
                                    <select
                                        name="status"
                                        defaultValue={formStorageData.status}
                                        {...register('status', { required: true })}
                                    >
                                        <option value="">請選擇</option>
                                        {
                                            Object.keys(productActiveStatus).map((key) => (

                                                <option
                                                    key={key}
                                                    value={key}
                                                >
                                                    {productActiveStatus[key]}
                                                </option>

                                            ))
                                        }
                                    </select>
                                </div>

                                {errors.priority && <ErrorMesg />}
                            </div>

                            <FormRow
                                labelTitle="價格"
                                required={true}
                                error={errors.price && true}
                            >
                                <input
                                    type="number"
                                    name="price"
                                    {...register('price', { required: true })}
                                />
                            </FormRow>
                        </div>

                        <div className="items">
                            <FormRow
                                labelTitle="檔案大小"
                                readonly
                            >
                                <input
                                    type="text"
                                    name="fileSize"
                                    readOnly
                                    {...register('fileSize')}
                                />
                            </FormRow>

                            <FormRow
                                labelTitle="模型數量"
                                required={true}
                                error={errors.modelSum && true}
                            >
                                <input
                                    type="number"
                                    name="modelSum"
                                    {...register('modelSum', { required: true })}
                                />
                            </FormRow>

                            <FormRow
                                labelTitle="貼圖尺寸"
                                required={true}
                                error={errors.perImgSize && true}
                            >
                                <input
                                    type="text"
                                    name="perImgSize"
                                    placeholder="1920x768"
                                    {...register('perImgSize', { required: true })}
                                />
                            </FormRow>
                        </div>

                        <FormRow
                            labelTitle="產品介紹"
                            className="textarea place-textarea"
                            noBorder={true}
                            required={true}
                            error={errors.description && true}
                        >
                            <textarea
                                name="description"
                                {...register('description', { required: true })}
                            />
                        </FormRow>

                        <div className="row">
                            <h3>圖片輪播</h3>
                            <UploadFiles
                                fileData={imageLists}
                                handleUploadData={handleUploadData}
                            />
                        </div>

                        {/* <div className="row row-thumb">
                            <h3>產品主圖</h3>
                            <UploadSingle size="1200x396" />
                        </div> */}
                    </Col>

                    <Col flex={1} className="right">
                        {/* <div className="row row-thumb">
                            <h3>縮圖(列表頁)</h3>
                            <UploadSingle size="563x312" />
                        </div> */}
                    </Col>
                </Row>

                <div className="row-btns">
                    <Buttons
                        text="儲存"
                        htmlType="submit"
                    />
                </div>
            </FormWrap>
        </Fragment>

    );

};

export default ProductForm;
