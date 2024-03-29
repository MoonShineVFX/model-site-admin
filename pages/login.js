import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createGlobalStyle } from 'styled-components';

import theme from '../src/utils/theme';
import HeadTag from '../src/containers/HeadTag';
import LightboxFormStyle from '../src/components/LightboxFormStyle';
import Buttons from '../src/components/Buttons';
import { FormRow } from '../src/components/LightboxForm';
import util from '../src/utils/util';
import Service from '../src/utils/util.service';

const { redirectTo } = util;

//
const LoginStyle = createGlobalStyle`
    .appContainer {
        justify-content: center;
        padding: 50px 40px 0;
    }
    .appContent {
        max-width: 480px;
        background-color: ${theme.palette.container} !important;
        margin-left: 0 !important;
        justify-content: center;
    }
    .ant-layout-header {
        display: none;
    }
    aside {
        display: none;
    }
    .ant-layout-content {
        width: 100%;
    }
    .section {
        max-height: 360px;
        height: 100%;
        background-color: #FFF;
        padding: 40px;
    }
    button.ant-btn.admin-btn {
        width: 100%;
        margin: 20px 0 0;
    }
`;

//
const Login = ({ pageData }) => {

    // State
    const [loading, setLoading] = useState(false);

    //
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // 送資料
    const handleReqData = (reqData) => {

        setLoading(true);
        let auth = btoa(`${reqData.account}:${reqData.password}`);

        Service.login({ headers: { Authorization: `Basic ${auth}`} })
            .then(redirectTo)
            .finally(() => setLoading(false));

    };

    return (

        <Fragment>
            <LoginStyle />
            <LightboxFormStyle />
            <HeadTag title={pageData.title} />

            <form onSubmit={handleSubmit(handleReqData)}>
                <FormRow
                    labelTitle="帳號"
                    name="account"
                    errors={errors}
                >
                    <input
                        type="text"
                        name="account"
                        {...register('account', { required: true })}
                    />
                </FormRow>

                <FormRow
                    labelTitle="密碼"
                    name="password"
                    errors={errors}
                >
                    <input
                        type="password"
                        name="password"
                        {...register('password', { required: true })}
                    />
                </FormRow>

                <Buttons
                    {...loading && { loading }}
                    text="送出"
                    htmlType="submit"
                />
            </form>
        </Fragment>

    );

};

export default Login;

export async function getServerSideProps ({ req }) {

    // 有 cookie(admin_token) 導首頁
    if (req.cookies.admin_token) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };

    }

    return {
        props: {
            pageData: {
                title: '登入',
            },
        },
    };

}
