import { Fragment, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import LightboxFormStyle from '../LightboxFormStyle';
import { FormWrapLayout } from './ProductLayout';
import Buttons from '../Buttons';
import Prompt from '../Prompt';
import { FormRow } from '../LightboxForm';
import Checkbox from '../Checkbox';

import { GlobalContext } from '../../context/global.state';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { activeStatus } = utilConst;

const ProductForm = ({ data, service }) => {

    // Router
    const router = useRouter();

    // Context
    const { currEvent, tags: tagsOpt } = useContext(GlobalContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: data?.title,
            isActive: data?.isActive ? 'true' : 'false',
            price: data?.price,
            fileSize: data?.fileSize,
            modelSum: data?.modelSum,
            perImgSize: data?.perImgSize,
            description: data?.description,
        },
    });

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            ...(service === 'productUpdate') && { id: data.id },
            isActive: (reqData.isActive === 'false') ? !reqData.isActive : !!reqData.isActive,
            price: +reqData.price,
            modelSum: +reqData.modelSum,
            // tags: reqData.tags.filter((id) => id).map((id) => +id), // Betty: 暫時不顯示 tag
        };

        Service[service](reqData)
            .then(() => {

                Prompt('success', {
                    callback: () => {

                        if (service === 'productCreate') router.push('/');
                        else {

                            if (window.confirm('編輯成功，是否導回列表頁?!')) router.push('/');

                        }

                    },
                });

            });

    };

    return (

        <Fragment>
            <LightboxFormStyle />

            <FormWrapLayout onSubmit={handleSubmit(handleReqData)}>
                {(currEvent === 'updateProduct') && <p>id: {data.id}</p>}

                <div className="items">
                    <FormRow
                        labelTitle="商品名稱"
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

                    <FormRow
                        labelTitle="價格"
                        name="price"
                        required
                        errors={errors}
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
                        name="fileSize"
                        required
                        errors={errors}
                    >
                        <input
                            type="number"
                            name="fileSize"
                            {...register('fileSize', { required: true })}
                        />
                    </FormRow>

                    <FormRow
                        labelTitle="模型數量"
                        name="modelSum"
                        required
                        errors={errors}
                    >
                        <input
                            type="number"
                            name="modelSum"
                            placeholder="Ex. 5"
                            {...register('modelSum', { required: true })}
                        />
                    </FormRow>

                    <FormRow
                        labelTitle="貼圖尺寸"
                        name="perImgSize"
                        required
                        errors={errors}
                    >
                        <input
                            type="text"
                            name="perImgSize"
                            placeholder="Ex. 1920x768"
                            {...register('perImgSize', { required: true })}
                        />
                    </FormRow>
                </div>

                <FormRow
                    className="textarea"
                    labelTitle="商品介紹"
                    name="description"
                    required
                    errors={errors}
                >
                    <textarea
                        name="description"
                        {...register('description', { required: true })}
                    />
                </FormRow>

                <FormRow
                    className="checkboxes"
                    labelTitle="標籤"
                    name="tags"
                    noBorder
                >
                    <div className="checkboxesWrap">
                        {
                            tagsOpt.map(({ id, name }, idx) => (

                                <div
                                    key={idx}
                                    className="checkbox-item"
                                >
                                    <Checkbox
                                        name="tags"
                                        value={id}
                                        defaultChecked={data?.tags?.some((val) => val === id)}
                                        register={register(`tags.${idx}`)}
                                    >
                                        {name}-{id}
                                    </Checkbox>
                                </div>

                            ))
                        }
                    </div>
                </FormRow>

                <div className="row-btns">
                    <Buttons
                        text="儲存"
                        htmlType="submit"
                    />
                </div>
            </FormWrapLayout>
        </Fragment>

    );

};

export default ProductForm;
