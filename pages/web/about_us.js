import { Fragment, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import LightboxFormStyle from '../../src/components/LightboxFormStyle';
import HeadTag from '../../src/containers/HeadTag';
import ContentHeader from '../../src/containers/ContentHeader';

import Buttons from '../../src/components/Buttons';
import UploadSingle from '../../src/components/UploadSingle';
import { FormRow, ErrorMesg } from '../../src/components/LightboxForm';

import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import utilConst from '../../src/utils/util.const';
import Service from '../../src/utils/util.service';

const { pathnameKey, uploadFileLimit, renderDateTime } = util;
const { limitSizeText } = utilConst;

//
const FormWrapLayout = styled.form(({ theme }) => ({
    maxWidth: '60%',
    '.update-time': {
        fontSize: '14px',
        textAlign: 'right',
        color: theme.palette.font,
        opacity: '0.6',
    },
    '.item-row': {
        marginRight: '20px',
        'input': {
            maxWidth: '100px',
            height: '34px',
            border: `1px solid ${theme.palette.border}`,
            borderRadius: '2px',
            marginRight: '6px',
            padding: '4px 12px',
        },
    },
    '.row-btns': {
        textAlign: 'left',
        '.admin-btn': {
            width: '200px',
            margin: '0',
        },
    },
}));

//
const RowUpload = styled.div({
    marginTop: '30px',
    marginBottom: '40px',
});

//
const AboutUs = ({ pageData }) => {

    // Router
    const { pathname } = useRouter();

    // Context
    const { globalDispatch, formStorageData, formStorageDispatch } = useContext(GlobalContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: { ...pageData.data },
    });

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname),
        });

        formStorageDispatch({
            type: 'COLLECT',
            payload: {
                imgUrl: pageData.data.imgUrl,
            },
        });

    }, []);

    // 送資料
    const handleReqData = (reqData) => {

        const formData = new FormData();

        reqData = {
            ...reqData,
            file: formStorageData.file,
            supportFormats: +reqData.supportFormats,
            supportModels: +reqData.supportModels,
            supportRenders: +reqData.supportRenders,
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

        Service.aboutUsUpdate(formData)
            .then(() => message.success('更新成功'));

    };

    return (

        <Fragment>
            <LightboxFormStyle />
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                langForm={<h1>1111</h1>}
                showLangButton
            />

            <FormWrapLayout onSubmit={handleSubmit(handleReqData)}>
                <p className="update-time">{pageData.data.updater} 更新於 {renderDateTime(pageData.data.updateTime)}</p>

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

                <FormRow
                    labelTitle="描述"
                    className="textarea"
                    noBorder={true}
                    required={true}
                    error={errors.description && true}
                >
                    <textarea
                        name="description"
                        {...register('description', { required: true })}
                    />
                </FormRow>

                <div className={`row item-row ${errors.supportModels ? 'hasError' : ''}`}>
                    <input
                        type="number"
                        name="supportModels"
                        {...register('supportModels', { required: true })}
                    />
                    套模型
                    {errors.supportModels && <ErrorMesg />}
                </div>

                <div className={`row item-row ${errors.supportFormats ? 'hasError' : ''}`}>
                    <input
                        type="number"
                        name="supportFormats"
                        {...register('supportFormats', { required: true })}
                    />
                    種3D軟體格式
                    {errors.supportFormats && <ErrorMesg />}
                </div>

                <div className={`row item-row ${errors.supportRenders ? 'hasError' : ''}`}>
                    <input
                        type="number"
                        name="supportRenders"
                        {...register('supportRenders', { required: true })}
                    />
                    個以上算圖引擎支援
                    {errors.supportRenders && <ErrorMesg />}
                </div>

                <RowUpload>
                    <UploadSingle size="1200x396" />
                </RowUpload>

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

export default AboutUs;

export async function getServerSideProps ({ req }) {

    // 沒有 cookie(admin_token) 導登入頁
    if (!req.cookies.admin_token) {

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    }

    const resData = await util.serviceServer({
        url: '/admin_about',
        cookie: req.cookies.admin_token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '關於平台',
                data: data.data,
            },
        },
    };

}
