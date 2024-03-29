import { Fragment, useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import LightboxFormStyle from '../../src/components/LightboxFormStyle';
import HeadTag from '../../src/containers/HeadTag';
import ContentHeader from '../../src/containers/ContentHeader';

import Buttons from '../../src/components/Buttons';
import { FormRow } from '../../src/components/LightboxForm';
import UploadSingle from '../../src/components/UploadSingle';
import ButtonsLang from '../../src/components/ButtonsLang';
import DeftagDataForm from '../../src/components/DeftagDataForm';

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
    const {
        isShow,
        globalDispatch,
        formStorageData,
        formStorageDispatch,
    } = useContext(GlobalContext);

    // State
    const [storage, setStorage] = useState({
        updater: pageData.data.updater,
        updateTime: pageData.data.updateTime,
    });

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: pageData.data.title,
            description: pageData.data.description,
            supportModels: pageData.data.supportModels,
            supportFormats: pageData.data.supportFormats,
            supportRenders: pageData.data.supportRenders,
        },
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
            supportFormats: +reqData.supportFormats,
            supportModels: +reqData.supportModels,
            supportRenders: +reqData.supportRenders,
            ...formStorageData?.file && { file: formStorageData.file },
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
            .then(({ updater, updateTime }) => {

                message.success('更新成功');
                setStorage({ ...storage, updater, updateTime });

            });

    };

    return (

        <Fragment>
            <LightboxFormStyle />
            <HeadTag title={pageData.title} />

            <ContentHeader title={pageData.title}>
                <ButtonsLang />
            </ContentHeader>

            <FormWrapLayout onSubmit={handleSubmit(handleReqData)}>
                <p className="update-time">{storage.updater} 更新於 {renderDateTime(storage.updateTime)}</p>

                <FormRow
                    labelTitle="標題"
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
                    labelTitle="描述"
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
                    className="item-row"
                    name="supportModels"
                    noBorder
                    required
                    errors={errors}
                >
                    <input
                        type="number"
                        name="supportModels"
                        {...register('supportModels', { required: true })}
                    />
                    套模型
                </FormRow>

                <FormRow
                    className="item-row"
                    name="supportFormats"
                    noBorder
                    required
                    errors={errors}
                >
                    <input
                        type="number"
                        name="supportFormats"
                        {...register('supportFormats', { required: true })}
                    />
                    種3D軟體格式
                </FormRow>

                <FormRow
                    className="item-row"
                    name="supportRenders"
                    noBorder
                    required
                    errors={errors}
                >
                    <input
                        type="number"
                        name="supportRenders"
                        {...register('supportRenders', { required: true })}
                    />
                    個以上算圖引擎支援
                </FormRow>

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

            {
                // 語系表單
                isShow &&
                    <DeftagDataForm
                        handleFetchData={Service.aboutUsDeftag}
                        handleUpdateData={Service.aboutUsUpdate}
                    />
            }
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
