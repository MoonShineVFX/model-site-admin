import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import HeadTag from '../../src/containers/HeadTag';
import ContentHeader from '../../src/containers/ContentHeader';
import TextEditorForm from '../../src/components/TextEditorForm';
import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';

const { serviceServer, pathnameKey } = util;

const TextEditorLayout = styled.div({
    '.adminEditor-wrapper': {
        height: 'calc(100vh - 30px - 50px - 50px - 60px - 60px - 54px)',
    },
});

const Privacy = ({ pageData }) => {

    // Router
    const router = useRouter();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(router.pathname, true),
        });

    }, [globalDispatch, router.pathname]);

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                showButton={false}
            />

            <TextEditorLayout>
                <TextEditorForm
                    name="detail"
                    content={pageData.data.detail}
                    serviceKey="privacyUpdate"
                    successCallback={() => router.reload()}
                />
            </TextEditorLayout>
        </Fragment>

    );

};

export default Privacy;

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

    const resData = await serviceServer({
        url: '/admin_privacy',
        cookie: req.cookies.admin_token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '隱私權政策',
                data: data.data,
            },
        },
    };

}
