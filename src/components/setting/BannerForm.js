import { useContext, useState } from 'react';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Buttons from '../Buttons';
import { FormRow } from '../LightboxForm';

import { GlobalContext } from '../../context/global.state';
import { BannerContext } from '../../context/setting/banner.state';
import util from '../../utils/util';
import utilConst from '../../utils/util.const';

const { uploadFileLimit } = util;
const { limitSizeText, activeStatus } = utilConst;

//
const UploadImageLayout = styled.div(({ theme }) => ({
    '.field': {
        display: 'inline-block',
        marginBottom: '4px',
    },
    '.suggest-size': {
        color: 'blue',
    },
    '.file-size': {
        color: '#bfbfbf',
        float: 'right',
        marginTop: 'calc((30px - 22px) / 2)',
    },
    '.image-preivew': {
        height: '200px',
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
}));

//
const UploadImage = ({
    data,
    title,
    image,
    imageSize,
    onChange,
}) => (

    <UploadImageLayout className="row row-upload">
        <div className="title">{title} <span className="suggest-size">(建議尺寸: {imageSize})</span></div>
        <div className="field noBorder">
            <input
                type="file"
                name="file"
                accept="image/*"
                onChange={onChange}
            />
        </div>

        <span className="file-size">
            {
                // 小於 1MB 顯示 KB
                (image?.size / 1024 / 1024 > 1) ?
                    `${(Math.round((image?.size / 1024 / 1024) * 100) / 100) || 0} MB` :
                    `${(Math.round((image?.size / 1024) * 100) / 100) || 0} KB`
            }
        </span>

        <div className="image-preivew">
            <img src={image ? URL.createObjectURL(image) : data} alt="" />
        </div>
    </UploadImageLayout>

);

//
const BannerForm = () => {

    // Context
    const {
        currEvent,
        formStorageDispatch,
        lightboxDispatch,
        formStorageData,
    } = useContext(GlobalContext);

    const {
        imageSize,
        mobileImageSize,
        bannerCreate,
        bannerUpdate,
    } = useContext(BannerContext);

    // State
    const [webImg, setWebImg] = useState(null);
    const [mobileImg, setMobileImg] = useState(null);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...formStorageData,
            isActive: formStorageData?.isActive ? 'true' : 'false',
        },
    });

    // 隱藏 Modal
    const hideModal = () => {

        formStorageDispatch({ type: 'CLEAR' });
        lightboxDispatch({ type: 'HIDE' });

    };

    // Change
    const handleUploader = ({ target }, type = 'large') => {

        if (type === 'large') setWebImg(target.files[0]);
        else setMobileImg(target.files[0]);

    };

    // 送資料
    const handleReqData = (reqData) => {

        const formData = new FormData();

        reqData = {
            ...reqData,
            ...(currEvent === 'updateBanner') && { id: formStorageData.id },
            isActive: (reqData.isActive === 'false') ? !reqData.isActive : !!reqData.isActive,
            ...webImg && { image: webImg },
            ...mobileImg && { mobileImage: mobileImg },
        };

        // 檢查: 圖片尺寸
        if (reqData.image || reqData.mobileImage) {

            const web = uploadFileLimit(reqData?.image?.size || 0);
            const mobile = uploadFileLimit(reqData?.mobileImage?.size || 0);

            // 檢查圖片大小是否超過 1MB
            if (!web || !mobile) {

                message.error(limitSizeText);
                return;

            }

        }

        for (let key in reqData) {

            formData.append(key, reqData[key]);

        }

        if (currEvent === 'updateBanner') bannerUpdate(formData);
        else bannerCreate(formData);

    };

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            <FormRow
                labelTitle="標題 (給圖片用)"
                name="title"
                required
                errors={errors}
            >
                <input
                    type="text"
                    name="title"
                    {...register('title', { required: true })}
                />
            </FormRow>

            <FormRow
                className="textarea"
                labelTitle="簡述"
                name="description"
                required
                errors={errors}
            >
                <textarea
                    name="description"
                    {...register('description', { required: true })}
                />
            </FormRow>

            <div className="items">
                <FormRow
                    labelTitle="商品ID"
                    name="productId"
                    required
                    errors={errors}
                >
                    <input
                        type="number"
                        name="productId"
                        {...register('productId', { required: true })}
                    />
                </FormRow>

                <FormRow
                    labelTitle="商品狀態"
                    name="isActive"
                    noBorder
                    required
                    errors={errors}
                >
                    <select
                        name="isActive"
                        {...register('isActive', { required: true })}
                    >
                        {
                            Object.keys(activeStatus).map((key) => (

                                <option
                                    key={key}
                                    value={key}
                                >
                                    {activeStatus[key]}
                                </option>

                            ))
                        }
                    </select>
                </FormRow>
            </div>

            <UploadImage
                title="大圖"
                data={formStorageData.imgUrl}
                image={webImg}
                imageSize={imageSize}
                onChange={handleUploader}
            />

            <UploadImage
                title="小圖"
                data={formStorageData.mobileImgUrl}
                image={mobileImg}
                imageSize={mobileImageSize}
                onChange={(e) => handleUploader(e, 'small')}
            />

            <div className="row row-btns">
                <Buttons
                    text="送出"
                    htmlType="submit"
                />
                <Buttons
                    text="取消"
                    type="default"
                    onClick={hideModal}
                />
            </div>
        </form>

    );

};

export default BannerForm;
