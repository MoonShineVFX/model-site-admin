import { Fragment, useContext, useEffect, useRef } from 'react';
import router from 'next/router';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import HeadTag from '../../src/containers/HeadTag';
import { FormRow } from '../../src/components/LightboxForm';
import Buttons from '../../src/components/Buttons';
import Links from '../../src/components/Links';
import LightboxFormStyle from '../../src/components/LightboxFormStyle';
import { GlobalContext } from '../../src/context/global.state';
import Service from '../../src/utils/util.service';

const FormWrapLayout = styled.form({
    maxWidth: '300px',
    '.title .admin-btn': {
        marginLeft: '10px',
    },
    '.row-btns': {
        textAlign: 'left',
        '.ant-btn': {
            margin: '0',
        },
    },
});

const ResetPassword = ({ pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm();

    // Ref
    const password = useRef({});
    password.current = watch('password');

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: 'admin_account',
        });

    }, []);

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            id: +pageData.uid,
        };

        delete reqData.confirm_password;
        Service.resetPassword(reqData)
            .then(() => {

                message.success('更新成功');
                router.push('/setting/admin_account');

            });

    };

    return (

        <Fragment>
            <LightboxFormStyle />
            <HeadTag title={pageData.title} />

            <FormWrapLayout onSubmit={handleSubmit(handleReqData)}>
                <h3 className="title">
                    <span>{pageData.title}</span>

                    <Buttons type="default">
                        <Links url="/setting/admin_account">回前頁</Links>
                    </Buttons>
                </h3>

                <FormRow
                    labelTitle="密碼"
                    required={true}
                    error={errors.password && true}
                >
                    <input
                        type="password"
                        name="password"
                        {...register('password', { required: true })}
                    />
                </FormRow>

                <FormRow
                    labelTitle="再次輸入密碼"
                    required={true}
                    error={errors.confirm_password && true}
                    errorMesg={errors?.confirm_password?.message}
                >
                    <input
                        type="password"
                        name="confirm_password"
                        {...register('confirm_password', {
                            required: true,
                            validate: (value) => (value === password.current) || '兩次輸入的密碼不同',
                        })}
                    />
                </FormRow>

                <div className="row-btns">
                    <Buttons
                        text="送出"
                        htmlType="submit"
                    />
                </div>
            </FormWrapLayout>
        </Fragment>

    );

};

export default ResetPassword;

export async function getServerSideProps ({ req, query }) {

    // 沒有 cookie(token) 導登入頁
    if (!req.cookies.token) {

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    }

    return {
        props: {
            pageData: {
                title: '變更密碼',
                uid: query.uid,
            },
        },
    };

}
