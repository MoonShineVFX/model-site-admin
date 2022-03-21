import { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import Buttons from '../components/Buttons';
import LightboxForm from '../components/LightboxForm';
import DeftagDataForm from '../components/DeftagDataForm';
import { GlobalContext } from '../context/global.state';
import useDeftag from '../utils/useDeftag';
import utilConst from '../utils/util.const';

const { langs, lightboxTitle } = utilConst;

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
    const {
        visible,
        currEvent,
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    // useDeftag
    const [btnCreateLang, hideModal] = useDeftag(null);

    // 隱藏 Modal
    // const hideModal = () => {

    //     lightboxDispatch({ type: 'HIDE' });
    //     formStorageDispatch({ type: 'CLEAR' });

    // };

    // 新增語系
    // const btnCreateLangOpt = (code) => {

    //     lightboxDispatch({ type: 'SHOW', currEvent: 'updateLang' });
    //     globalDispatch({ type: 'langCode', payload: code });

    // };

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

            {
                // visible &&
                //     <LightboxForm
                //         width={800}
                //         title={lightboxTitle[currEvent]}
                //         visible={visible}
                //         handleCancel={hideModal}
                //         className="lightbox-deftag-wrap"
                //     >
                //         <DeftagDataForm />
                //     </LightboxForm>
            }
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
