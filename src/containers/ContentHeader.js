import { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Buttons from '../components/Buttons';

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
        paddingLeft: '40px',
        paddingRight: '40px',
    },
});

const ContentHeader = ({ title, showButton, onClick, children }) => (

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
    showButton: true,
};

ContentHeader.propTypes = {
    title: PropTypes.string.isRequired,
    showButton: PropTypes.bool,
    onClick: PropTypes.func,
};

export default ContentHeader;
