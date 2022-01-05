import { Fragment, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import LightboxFormStyle from '../LightboxFormStyle';
import Buttons from '../Buttons';
import Prompt from '../Prompt';
import { FormRow, ErrorMesg } from '../LightboxForm';
import { FormWrap } from './ProductLayout';

import { GlobalContext } from '../../context/global.state';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { productActiveStatus } = utilConst;

const ProductForm = ({ data, serviceKey }) => {

    // console.log('ProductForm data:', data)

    // Router
    const router = useRouter();

    // Context
    const { currEvent } = useContext(GlobalContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...data,
            isActive: data?.isActive ? 'true' : 'false'
        },
    });

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            isActive: (reqData.isActive === 'false') ? !reqData.isActive : !!reqData.isActive,
            price: +reqData.price,
            modelSum: +reqData.modelSum,
        };

        delete reqData.fileSize;

        Service[serviceKey](reqData)
            .then(() => {

                Prompt('success', {
                    callback: () => {

                        if (serviceKey === 'productCreate') router.push('/');

                    },
                });

            });

    };

    return (

        <Fragment>
            <LightboxFormStyle />

            <FormWrap onSubmit={handleSubmit(handleReqData)}>
                {(currEvent === 'updateProduct') && <p>id: {data.id}</p>}

                <div className="items">
                    <FormRow
                        labelTitle="商品名稱"
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
                            placeholder="5"
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
                    labelTitle="商品介紹"
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
