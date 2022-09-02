import { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Tooltip } from 'antd';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

import LightboxFormStyle from '../LightboxFormStyle';
import { RowWrapLayout, WarningLayout, ItemWrapLayout } from './ModelLayout';
import Buttons from '../Buttons';
import FontIcon from '../FontIcon';
import { FormRow } from '../LightboxForm';
import UploadFiles from '../UploadFiles';

import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
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
        formatName,
        rendererName,
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
            <div className="opts">
                <Tooltip title="軟體格式">{formatName}</Tooltip> / <Tooltip title="算圖引擎">{rendererName}</Tooltip>
            </div>
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

    // Context
    const { formStorageData, formStorageDispatch } = useContext(GlobalContext);

    // State
    const [list, setList] = useState(models || []);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();

    // 刪除檔案
    const handleDelete = (id) => {

        Service.modelDelete({ id })
            .then(() => {

                setList(list.filter((obj) => obj.id !== id));
                alert('已刪除');

            });

    };

    // 清除與還原
    const resetForm = () => {

        reset({
            formatId: '',
            rendererId: '',
        });
        formStorageDispatch({ type: 'CLEAR' });

    };

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            productId: +router.query.id,
            formatId: +reqData.formatId,
            rendererId: +reqData.rendererId,
            size: formStorageData.selectedFile.size,
            filename: formStorageData.selectedFile.name,
        };

        Service.modelUploadUri(reqData)
            .then(async ({ sessionUri }) => {

                // 向 google cloud storage 上傳檔案
                await axios({
                    method: 'put',
                    url: sessionUri,
                    data: formStorageData.selectedFile,
                })
                .finally(() => alert('上傳成功'));

                await Service.modelList(+router.query.id)
                        .then(({ data: { models } }) => {

                            setList(models);
                            resetForm();

                        });

            });

    };

    return (

        <Fragment>
            <LightboxFormStyle />

            <RowWrapLayout className="row">
                <WarningLayout
                    className="notice"
                    type="warning"
                    message={
                        <ul>
                            <li>根據 Google Storage 機制，每個檔案至少有<span className="warning-text"> "兩天" 的保護期</span> ，期間內無法刪除</li>
                            <li>檔名請勿使用特殊符號，僅允許底線 "_"</li>
                            <li>因上傳大檔案需花費較久時間，上傳期間請勿離開此頁面或重整頁面，以免造成上傳失敗</li>
                        </ul>
                    }
                />

                <form onSubmit={handleSubmit(handleReqData)}>
                    <UploadFiles
                        text="選擇檔案"
                        fileList={arrangeFileList(list)}
                        itemRender={(originNode, file) => (

                            <Fragment>
                                <div className="count">共 {list.length} 包模型</div>

                                <ItemWrap
                                    file={file}
                                    handleDelete={handleDelete}
                                />
                            </Fragment>

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
