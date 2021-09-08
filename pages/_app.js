import { Fragment, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createGlobalStyle, ThemeProvider, styled } from 'styled-components';
import { Layout } from 'antd';

// Context
import { GlobalProvider } from '../src/context/global.state';

// import Header from '../src/containers/Header';
// import Navbar from '../src/containers/Navbar';
import MainContent from '../src/containers/MainContent';

const { Header, Content, Footer, Sider } = Layout;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const theme = {
    // main: 'mediumseagreen',
};

// const SiderWrap = styled(Sider)`

// `;

// const MainWrap = styled(Layout)`

// `;

//
const AdminSite = ({ Component, pageProps }) => {

    const router = useRouter();

    // useEffect(() => {

    //     const handleRouteChange = (url, { shallow }) => {

    //         console.log(
    //             `App is changing to ${url} ${
    //             shallow ? 'with' : 'without'
    //             } shallow routing`
    //         );

    //     };

    //     router.events.on('routeChangeStart', handleRouteChange);

    //     return () => {

    //         router.events.off('routeChangeStart', handleRouteChange);

    //     };

    // }, []);

    return (

        <Fragment>
            <Head>
                <title>模型後台</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>

            <ThemeProvider theme={theme}>
                <GlobalStyle />

                <GlobalProvider>
                    <Layout>
                        <Sider
                            style={{
                                overflow: 'auto',
                                height: '100vh',
                                position: 'fixed',
                                left: 0,
                            }}
                        >
                            Menus
                        </Sider>

                        <Layout
                            style={{ marginLeft: 200 }}
                        >
                            <Header style={{ padding: 0 }} />

                            <Content
                                style={{
                                    margin: '24px 16px 0',
                                    overflow: 'initial'
                                }}
                            >
                                <MainContent
                                    Component={Component}
                                    pageProps={pageProps}
                                />
                            </Content>

                            <Footer style={{ textAlign: 'center' }}>模型後台 ©2021 Created by MoonShine</Footer>
                        </Layout>
                    </Layout>
                </GlobalProvider>
            </ThemeProvider>
        </Fragment>

    );

};

export default AdminSite;
