import { Fragment } from 'react';
import { Layout } from 'antd';
import styled, { ThemeProvider } from 'styled-components';
import { config } from '@fortawesome/fontawesome-svg-core';
import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import HeadTag from '../src/containers/HeadTag';
import GlobalStyle from '../src/containers/GlobalStyle';
import theme from '../src/utils/theme';
import MainHeader from '../src/containers/MainHeader';
import Navbar from '../src/containers/Navbar';
import MainContent from '../src/containers/MainContent';

// Context
import { GlobalProvider } from '../src/context/global.state';

config.autoAddCss = false;
const { Content, Footer } = Layout;
const navbarWidth = 240;

const ContentLayout = styled(Content)({
    minHeight: 'calc(100vh - 50px - 54px - 30px)', // header: 50px, footer: 54px, main margin bottom: 30px
    marginBottom: '30px',
    padding: '30px 30px 20px',
});

const FooterLayout = styled(Footer)(({ theme}) => ({
    textAlign: 'center',
    backgroundColor: theme.palette.container,
    paddingTop: '16px',
    paddingBottom: '16px',
}));

//
const AdminSite = ({ Component, pageProps }) => (

    <Fragment>
        <HeadTag />

        <ThemeProvider theme={theme}>
            <GlobalStyle />

            <GlobalProvider>
                <Layout className="appContainer">
                    <Navbar width={navbarWidth} />

                    <Layout
                        className="appContent"
                        style={{
                            marginLeft: navbarWidth,
                            backgroundColor: '#FFF',
                        }}
                    >
                        <MainHeader />

                        <ContentLayout>
                            <MainContent>
                                <Component {...pageProps} />
                            </MainContent>
                        </ContentLayout>

                        <FooterLayout>Copyright © Moonshine All rights reserved.</FooterLayout>
                    </Layout>
                </Layout>
            </GlobalProvider>
        </ThemeProvider>
    </Fragment>

);

export default AdminSite;
