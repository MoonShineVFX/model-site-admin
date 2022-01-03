import { useContext } from 'react';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Buttons from '../Buttons';
import UploadSingle from '../Upload';
import { FormRow, ErrorMesg } from '../LightboxForm';
import { GlobalContext } from '../../context/global.state';
import { BannerContext } from '../../context/product/product.state';

const RowUpload = styled.div.attrs(() => ({
    className: 'row row-upload',
}))({
    marginTop: '30px',
    marginBottom: '40px',
});

const BannerForm = () => {

    // Context
    const {
        currEvent,
        formStorageData,
        formStorageDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    const {
        imageSize,
        bannerCreate,
        bannerUpdate,
    } = useContext(BannerContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: { ...formStorageData },
    });

    // 隱藏 Modal
    const hideModal = () => {

        formStorageDispatch({ type: 'CLEAR' });
        lightboxDispatch({ type: 'HIDE' });

    };

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

        if (currEvent === 'updateBanner') bannerUpdate(formData);
        else bannerCreate(formData);

    };

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            {(currEvent === 'updateBanner') && <p>id: {formStorageData.id}</p>}

            <div className="items">
                <FormRow labelTitle="小標題">
                    <input
                        type="text"
                        name="title"
                        defaultValue={formStorageData.title}
                        placeholder="給 SEO 用"
                        {...register('title')}
                    />
                </FormRow>

                <div className={`row ${errors.priority ? 'hasError' : ''}`}>
                    <div className="title isRequired">優先度 (必填)</div>
                    <div className="field noBorder">
                        <select
                            name="priority"
                            defaultValue={formStorageData.priority}
                            {...register('priority', { required: true })}
                        >
                            <option value="">請選擇</option>
                            {
                                [...Array(10).keys()].map((val) => (
                                    <option
                                        key={val}
                                        value={val + 1}
                                    >
                                        {val + 1}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    {errors.priority && <ErrorMesg />}
                </div>
            </div>

            <FormRow
                labelTitle="外部網址(URL)"
                required={true}
                error={errors.link && true}
                {...(errors.link?.type === 'pattern') && { errorMesg: '格式錯誤' }}
            >
                <input
                    type="text"
                    name="link"
                    defaultValue={formStorageData.link}
                    placeholder="請輸入完整連結 (https 或 http)"
                    {...register('link', {
                        required: true,
                        pattern: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g,
                    })}
                />
            </FormRow>

            <RowUpload>
                <UploadSingle size={imageSize} />
            </RowUpload>

            <div className="row row-btns">
                <Buttons
                    text="取消"
                    type="default"
                    onClick={hideModal}
                />
                <Buttons
                    text="送出"
                    htmlType="submit"
                />
            </div>
        </form>

    );

};

export default BannerForm;
