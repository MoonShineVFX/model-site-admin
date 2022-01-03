import PropTypes from 'prop-types';
import { CheckOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import styled from 'styled-components';

const CheckboxLayout = styled.label(({ theme }) => ({
    paddingLeft: '24px',
    position: 'relative',
    cursor: 'pointer',
    'input[type="checkbox"]': {
        width: 0,
        height: 0,
        position: 'absolute',
        opacity: 0,
        '&:checked + .checkmark': {
            backgroundColor: blue.primary,
            border: 0,
            'span': {
                color: '#FFF',
                display: 'block',
            },
            'svg': {
                verticalAlign: '-10.5px',
            },
        },
    },
    '.checkmark': {
        width: '18px',
        height: '18px',
        border: `1px solid ${theme.palette.border}`,
        borderRadius: '2px',
        position: 'absolute',
        top: 0,
        left: 0,
        'span': {
            display: 'none',
        },
    },
}));

const Checkbox = ({
    className,
    name,
    register,
    children,
    ...rest
}) => (

    <CheckboxLayout className={className}>
        <span>{children}</span>
        <input
            type="checkbox"
            name={name}
            {...register}
            {...rest}
        />
        <span className="checkmark">
            <CheckOutlined />
        </span>
    </CheckboxLayout>

);

Checkbox.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    register: PropTypes.object,
    children: PropTypes.any,
};

export default Checkbox;
