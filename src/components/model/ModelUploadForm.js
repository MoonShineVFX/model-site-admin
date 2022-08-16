import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import LightboxFormStyle from '../LightboxFormStyle';
import { RowWrapLayout, WarningLayout, ItemWrapLayout } from './ModelLayout';
import Buttons from '../Buttons';
import FontIcon from '../FontIcon';
import { FormRow } from '../LightboxForm';
import UploadFiles from '../UploadFiles';

import util from '../../utils/util';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { renderBytesConvert, renderDateTime } = util;

// 整理成 antd 格式
const arrangeFileList = (data) => data.reduce((acc, {
    id,
    size,
    filename,
    ...rest
}) => {

    const obj = {
        uid: id,
        size,
        name: filename,
        ...rest,
    };

    acc.push(obj);
    return acc;

}, []);

const ItemWrap = ({
    file: {
        uid,
        name,
        size,
        creator,
        createTime,
        canDelete,
    },
    handleDelete,
}) => (

    <ItemWrapLayout>
        <div className="fileWrap">
            <div className="row-file fileAttach">
                <FontIcon icon={faPaperclip} />
            </div>
            <div className="row-file fileInfo">
                <div className="name">{name}</div>
                <div className="small-info">檔案大小: {renderBytesConvert(size)}</div>
            </div>
            <div className="row-file">
                {
                    canDelete &&
                        <span
                            className="btn-delete"
                            onClick={() => handleDelete(uid)}
                        >
                            <FontIcon icon={faTrashCan}/>
                        </span>
                }
            </div>
        </div>
        <div className="fileLogs">
            由 <span className="creator">{creator}</span> 於 {renderDateTime(createTime)} 上傳
        </div>
    </ItemWrapLayout>

);

const ModelUploadForm = ({
    data: {
        formats,
        renderers,
        models,
    },
}) => {

    // Router
    const router = useRouter();

    // State
    const [list, setList] = useState(models || []);

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
    const handleDelete = (id) => {

        console.log('delete', id);

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
                        fileList={arrangeFileList(list)}
                        itemRender={(originNode, file) => (

                            <ItemWrap
                                file={file}
                                handleDelete={handleDelete}
                            />

                        )}
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
                                    formats.map(({ id, name }) => (

                                        <option
                                            key={id}
                                            value={id}
                                        >
                                            [{id}] {name}
                                        </option>

                                    ))
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
                                    renderers.map(({ id, name }) => (

                                        <option
                                            key={id}
                                            value={id}
                                        >
                                            [{id}] {name}
                                        </option>

                                    ))
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
