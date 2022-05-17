import { useContext } from 'react';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Buttons from '../Buttons';
import UploadSingle from '../UploadSingle';
import { FormRow, ErrorMesg } from '../LightboxForm';
import { GlobalContext } from '../../context/global.state';
import { TutorialContext } from '../../context/setting/tutorial.state';
import util from '../../utils/util';
import utilConst from '../../utils/util.const';

const { uploadFileLimit } = util;
const { limitSizeText, productActiveStatus } = utilConst;

//
const RowUpload = styled.div({
    marginTop: '30px',
    marginBottom: '40px',
});

const TutorialForm = () => {

    // Context
    const {
        currEvent,
        formStorageDispatch,
        lightboxDispatch,
        formStorageData,
    } = useContext(GlobalContext);

    const { imageSize, tutorialCreate, tutorialUpdate } = useContext(TutorialContext);

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

    // 送資料
    const handleReqData = (reqData) => {

        const formData = new FormData();

        reqData = {
            ...reqData,
            ...formStorageData?.file && { file: formStorageData?.file },
            ...(currEvent === 'updateTutorial') && { id: formStorageData.id },
            isActive: (reqData.isActive === 'false') ? !reqData.isActive : !!reqData.isActive,
        };

        // 檢查: 圖片尺寸
        if (reqData.file) {

            const limitSize = uploadFileLimit(reqData.file.size);

            // 檢查圖片大小是否超過 1MB
            if (!limitSize) {

                message.error(limitSizeText);
                return;

            }

        }

        for (let key in reqData) {

            formData.append(key, reqData[key]);

        }

        if (currEvent === 'updateTutorial') tutorialUpdate(formData);
        else tutorialCreate(formData);

    };

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            <div className="items">
                <FormRow
                    labelTitle="標題"
                    required={true}
                    error={errors.title && true}
                >
                    <input
                        type="text"
                        name="title"
                        {...register('title', { required: true })}
                    />
                </FormRow>

                <div className={`row ${errors.isActive ? 'hasError' : ''}`}>
                    <div className="title isRequired">商品狀態 (必填)</div>
                    <div className="field noBorder">
                        <select
                            name="isActive"
                            {...register('isActive', { required: true })}
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
            </div>

            <FormRow
                labelTitle="外部連結"
                required={true}
                error={errors.link && true}
            >
                <input
                    type="text"
                    name="link"
                    {...register('link', { required: true })}
                />
            </FormRow>

            <RowUpload>
                <UploadSingle size={imageSize} />
            </RowUpload>

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

export default TutorialForm;
