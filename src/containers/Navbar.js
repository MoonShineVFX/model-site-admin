import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import Links from '../components/Links';
import { GlobalContext } from '../context/global.state';
import utilConst from '../utils/util.const';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;
const { navbar: navbrItem } = utilConst;

const SiderLayout = styled(Sider)(({ theme }) => ({
    height: '100vh',
    textAlign: 'center',
    padding: '20px 0',
    position: 'fixed',
    left: '0',
    overflow: 'auto',
    zIndex: '1',
    '.logo': {
        display: 'inline-block',
        marginBottom: '20px',
        padding: '0 20px',
    },
    'li': {
        fontSize: '16px',
    },
}));

const Navbar = ({ width }) => {

    // Context
    const { page, formStorageDispatch } = useContext(GlobalContext);

    // 清除圖片暫存
    const handleClearFormStorage = () => formStorageDispatch({ type: 'CLEAR' });

    return (

        <SiderLayout width={width}>
            <Links url="/" className="logo">
                <img src="//fakeimg.pl/200x60?text=LOGO" alt="LOGO" />
            </Links>

            <Menu
                theme="dark"
                mode="inline"
                openKeys={navbrItem.flatMap(({ pageKey }) => pageKey)}
                selectedKeys={[page]}
            >
                {
                    navbrItem.map(({ name, pageKey, subItems }) => (

                        subItems.length ? (

                            <SubMenu key={pageKey} title={name}>
                                {
                                    subItems.map((obj) => (

                                        <Item key={obj.pageKey}>
                                            <Links url={`/${pageKey}/${obj.pageKey}`} onClick={handleClearFormStorage}>{obj.name}</Links>
                                        </Item>

                                    ))
                                }
                            </SubMenu>

                        ) : (

                            <Item key={pageKey}>
                                <Links url={`/${pageKey}`} onClick={handleClearFormStorage}>{name}</Links>
                            </Item>

                        )

                    ))
                }
            </Menu>
        </SiderLayout>

    );

};

Navbar.defaultProps = {
    width: 240,
};

Navbar.propTypes = {
    width: PropTypes.number,
};

export default Navbar;

/**
 * demo active link
 * https://stackblitz.com/github/vercel/next.js/tree/canary/examples/active-class-name?file=components%2FActiveLink.js
 */
