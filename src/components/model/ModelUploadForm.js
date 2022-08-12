import { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Alert } from 'antd';
import { useForm } from 'react-hook-form';

import LightboxFormStyle from '../LightboxFormStyle';
import { RowWrapLayout, WarningLayout } from './ModelLayout';
import Buttons from '../Buttons';
import { FormRow } from '../LightboxForm';
import UploadFiles from '../UploadFiles';

import { GlobalContext } from '../../context/global.state';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const ModelUploadForm = ({ data }) => {

    // Router
    const router = useRouter();

    // Context
    // const { currEvent } = useContext(GlobalContext);

    // State
    const [list, setList] = useState(data?.list || []);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // 送資料
    const handleReqData = (reqData) => {

        console.log('reqData:', reqData)

        // Service[service](reqData)
        //     .then(() => {

        //         Prompt('success', {
        //             callback: () => {

        //                 if (service === 'productCreate') router.push('/');
        //                 else {

        //                     if (window.confirm('編輯成功，是否導回列表頁?!')) router.push('/');

        //                 }

        //             },
        //         });

        //     });

    };

    // 刪除檔案
    const handleDelete = () => {

        console.log('delete');

    };

    return (

        <Fragment>
            <LightboxFormStyle />

            <RowWrapLayout className="row">
                <WarningLayout
                    className="notice"
                    type="warning"
                    message={
                        <Fragment>
                            根據 Google Storage 機制，每個檔案至少有<span className="warning-text"> "兩天" 的保護期</span> ，期間內無法刪除。
                        </Fragment>
                    }
                />

                <form onSubmit={handleSubmit(handleReqData)}>
                    <UploadFiles
                        text="選擇檔案"
                        fileData={list}
                        handleDelete={handleDelete}
                    >
                        <FormRow
                            className="row-format"
                            name="formatId"
                            noBorder
                            required
                            errors={errors}
                        >
                            <select
                                name="formatId"
                                {...register('formatId', { required: true })}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <option value="">請選擇</option>
                                {
                                    // imagePosition.map(({ id, key, name }) => (

                                    //     (key !== 'preview') &&
                                    //         <option
                                    //             key={id}
                                    //             value={id}
                                    //         >
                                    //             {`${name} (${mappingSize[key]})`}
                                    //         </option>

                                    // ))
                                }
                            </select>
                        </FormRow>

                        <FormRow
                            className="row-renderer"
                            name="rendererId"
                            noBorder
                            required
                            errors={errors}
                        >
                            <select
                                name="rendererId"
                                {...register('rendererId', { required: true })}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <option value="">請選擇</option>
                                {
                                    // imagePosition.map(({ id, key, name }) => (

                                    //     (key !== 'preview') &&
                                    //         <option
                                    //             key={id}
                                    //             value={id}
                                    //         >
                                    //             {`${name} (${mappingSize[key]})`}
                                    //         </option>

                                    // ))
                                }
                            </select>
                        </FormRow>

                        <Buttons
                            text="上傳"
                            htmlType="submit"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </UploadFiles>
                </form>
            </RowWrapLayout>
        </Fragment>

    );

};

export default ModelUploadForm;
