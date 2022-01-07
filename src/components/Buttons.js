import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';

const ButtonLayout = styled(Button).attrs(() => ({
    className: 'admin-btn',
}))({
    height: 'auto',
    fontSize: '15px',
    padding: '4px 24px',
    'span': {
        letterSpacing: '-2px',
    },
    '&.third': {
        backgroundColor: '#FF9900',
        borderColor: '#FF9900',
        'span': {
            letterSpacing: '0',
        },
    },
});

const Buttons = ({ type, text, children, ...rest }) => (

    <ButtonLayout
        type={type}
        {...rest}
    >
        {text ? text : children}
    </ButtonLayout>

);

Buttons.defaultProps = {
    type: 'primary',
};

Buttons.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
};

export default Buttons;
