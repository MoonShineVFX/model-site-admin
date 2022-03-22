import { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import Buttons from '../components/Buttons';
import { GlobalContext } from '../context/global.state';
import utilConst from '../utils/util.const';

const { langs } = utilConst;

//
const ContentHeaderLayout = styled.div({
    marginBottom: '16px',
    '> *': {
        float: 'right',
    },
    '&:after': {
        content: '""',
        display: 'block',
        clear: 'both',
    },
    '.btn-create, .btn-createLang': {
        float: 'left',
        paddingLeft: '40px',
        paddingRight: '40px',
    },
    '.btn-create': {
        marginRight: '20px',
    },
    '.btn-createLang': {
        'span': {
            letterSpacing: '0',
        },
    },
});

// 語系選單
const renderMenu = ({ onClick }) => (

    <Menu>
        {
            Object.keys(langs).map((code) => (

                (code !== 'zh') &&
                    <Menu.Item
                        key={code}
                        onClick={() => onClick(code)}
                    >
                        {code} - {langs[code]}
                    </Menu.Item>

            ))
        }
    </Menu>

);

//
const ContentHeader = ({
    title,
    showButton,
    showLangButton,
    onClick,
    children,
}) => {

    // Context
    const { globalDispatch, deftagFormDispatch } = useContext(GlobalContext);

    // 新增語系
    const btnCreateLang = (code) => {

        deftagFormDispatch({ type: 'SHOW', curr: 'updateLang' });
        globalDispatch({ type: 'langCode', payload: code });

    };

    return (

        <Fragment>
            <h1>{title}</h1>

            <ContentHeaderLayout>
                {
                    showButton &&
                        <Buttons
                            text="新增"
                            className="btn-create"
                            onClick={onClick}
                        />
                }

                {children && children}

                {
                    showLangButton &&
                        <Dropdown
                            overlay={renderMenu({ onClick: btnCreateLang })}
                            trigger={['click']}
                            arrow={{ pointAtCenter: true }}
                        >
                            <Buttons
                                text="新增語言"
                                className="btn-createLang"
                            />
                        </Dropdown>
                }
            </ContentHeaderLayout>
        </Fragment>

    );

};

ContentHeader.defaultProps = {
    showButton: false,
    showLangButton: false,
};

ContentHeader.propTypes = {
    title: PropTypes.string.isRequired,
    showButton: PropTypes.bool,
    showLangButton: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.any,
};

export default ContentHeader;
