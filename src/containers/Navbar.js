import { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import Links from '../components/Links';
import { GlobalContext } from '../context/global.state';
import utilConst from '../utils/util.const';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;
const { navbar: navbrItem } = utilConst;

const mapping = {
    product: '商品',
    order: '訂單',
    setting: '設定',
};

const arrangeNavbar = (array) => array.reduce((acc, curr) => {

    acc[curr.group] = acc[curr.group] || {};
    acc[curr.group].list = acc[curr.group].list || [];
    acc[curr.group].list.push(curr);
    return acc;

}, {});

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
    '.navbar-item': {
        textAlign: 'left',
        marginBottom: '20px',
        paddingInlineStart: '0',
        '*': {
            color: '#FFF',
        },
        '> *': {
            padding: '0 20px',
            opacity: '0.6',
        },
    },
    '.item': {
        display: 'block',
        margin: '10px 0',
        padding: '10px 20px',
        transition: 'all .5s ease',
        '&:hover': {
            opacity: '1',
        },
    },
    '.active': {
        backgroundColor: theme.palette.blue,
        opacity: '1',
    },
    '.title': {
        fontSize: '14px',
        fontWeight: 'normal',
        marginBottom: '10px',
    },
}));

const Navbar = ({ width }) => {

    // Context
    const { page, formStorageDispatch } = useContext(GlobalContext);

    // State
    const [navItem, setNavItem] = useState(arrangeNavbar(navbrItem));

    // 清除圖片暫存
    const handleClearFormStorage = () => formStorageDispatch({ type: 'CLEAR' });

    console.log('check:', arrangeNavbar(navbrItem))

    return (

        <SiderLayout width={width}>
            <Links url="/" className="logo">
                <img src="//fakeimg.pl/200x60?text=LOGO" alt="LOGO" />
            </Links>

            {/* <Menu
                theme="dark"
                // mode="inline"
                openKeys={navbrItem.flatMap(({ pageKey }) => pageKey)}
                selectedKeys={[page]}
            >
                {
                    navbrItem.map(({ name, pageKey }) => (

                        <Item key={pageKey}>
                            <Links url={`/${pageKey}`} onClick={handleClearFormStorage}>{name}</Links>
                        </Item>

                    ))
                }
            </Menu> */}

            <div className="navbarWrap">
                {
                    Object.keys(navItem).map((key) => (

                        <div
                            key={key}
                            className="navbar-item"
                        >
                            <h4 className="title">{mapping[key]}</h4>
                            {
                                navItem[key].list.map(({ name, pageKey }) => (

                                    <Links
                                        key={pageKey}
                                        url={`/${pageKey}`}
                                        onClick={handleClearFormStorage}
                                        className={`item ${(pageKey === page) ? 'active' : ''}`}
                                    >
                                        {name}
                                    </Links>

                                ))
                            }
                        </div>

                    ))
                }
            </div>
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
