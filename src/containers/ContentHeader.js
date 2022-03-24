import { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Buttons from '../components/Buttons';

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
    '.btn-create': {
        float: 'left',
        marginRight: '20px',
        paddingLeft: '40px',
        paddingRight: '40px',
    },
    '.btn-createLang': {
        float: 'left',
        'span': {
            letterSpacing: '0',
        },
    },
});

//
const ContentHeader = ({
    title,
    showButton,
    onClick,
    children,
}) => (

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
        </ContentHeaderLayout>
    </Fragment>

);

ContentHeader.defaultProps = {
    showButton: false,
    showLangButton: false,
};

ContentHeader.propTypes = {
    title: PropTypes.string.isRequired,
    showButton: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.any,
};

export default ContentHeader;
