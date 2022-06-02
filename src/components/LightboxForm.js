import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { ErrorMessage } from '@hookform/error-message';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import LightboxFormStyle from './LightboxFormStyle';
import utilConst from '../utils/util.const';

const { errorText } = utilConst;

const errMesg = {
    err_required: '此欄位為必填',
    err_pattern: '格式有誤',
};

// 錯誤訊息
const ErrorMesg = ({ error }) => <p className="error">{error || errorText}</p>;

// 錯誤訊息: 客製化欄位
const OtherErrorMesg = () => (

    <div className="other-error-mesg">
        <ExclamationCircleOutlined />
        <span className="mesg">請將資料填寫完畢!!!</span>
    </div>

);

const LightboxFormLayout = styled(Modal)(({ theme }) => ({
    '.ant-modal-header': {
        padding: '20px',
    },
    '.ant-modal-title': {
        fontSize: '20px',
        fontWeight: 'bold',
        position: 'relative',
    },
    '.ant-modal-body': {
        minHeight: '150px',
        padding: '30px 40px',
    },
    '.title': {
        fontSize: '15px',
        fontWeight: 'normal',
        color: theme.palette.font,
    },
    '.items': {
        display: 'flex',
        '.row': {
            flex: 1,
            '&:not(:last-child)': {
                marginRight: '20px',
            },
        },
    },
}));

// Lightbox Form
const LightboxForm = ({
    visible,
    width,
    title,
    className,
    handleCancel,
    children,
    ...rest
}) => (

    <Fragment>
        <LightboxFormStyle />
        <LightboxFormLayout
            visible={visible}
            width={width}
            title={title}
            centered={true}
            wrapClassName={`lightbox-wrap ${className}`}
            onCancel={handleCancel}
            footer={null}
            {...rest}
        >
            {children}
        </LightboxFormLayout>
    </Fragment>

);

// Form 欄位
const FormRow = ({
    className,
    labelTitle,
    name,
    required,
    noBorder,
    readonly,
    errors,
    children,
}) => (

    <label className={`row ${errors?.[name]?.type ? 'hasError' : ''} ${className && className}`}>
        {
            labelTitle &&
                <div className={`title ${required ? 'isRequired' : ''}`}>
                    {
                        (typeof labelTitle === 'string') ? `${labelTitle}${required ? ' (必填)' : ''}` : labelTitle
                    }
                </div>
        }

        <div className={`field ${noBorder ? 'noBorder' : ''} ${readonly ? 'readonly' : ''}`}>{children}</div>

        {
            errors?.[name] &&
                <FormErrorMesg
                    name={name}
                    errors={errors}
                />
        }
    </label>

);

// 錯誤訊息
const FormErrorMesg = ({ name, errors }) => (

    <ErrorMessage
        name={name}
        errors={errors}
        message={errMesg[`err_${errors[name]?.type}`]}
        render={({ message }) => <p className="error-mesg">{message}</p>}
    />

);

// 成功訊息
const FormSuccessMesg = ({ mesg }) => <p className="success-mesg">{mesg}</p>;

// LightboxForm
LightboxForm.defaultProps = {
    title: '新增',
    visible: false,
    width: 520,
    className: '',
    btnTextYes: '確認',
    btnTypeYes: 'primary',
};

LightboxForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    className: PropTypes.string,
    handleCancel: PropTypes.func,
    children: PropTypes.any.isRequired,
};

// FormRow
FormRow.defaultProps = {
    className: '',
    required: false,
    noBorder: false,
    readonly: false,
};

FormRow.propTypes = {
    className: PropTypes.string,
    labelTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    name: PropTypes.string,
    required: PropTypes.bool,
    noBorder: PropTypes.bool,
    readonly: PropTypes.bool,
    errors: PropTypes.object,
    children: PropTypes.any.isRequired,
};

// FormSuccessMesg
FormSuccessMesg.propTypes = {
    mesg: PropTypes.string,
};

// FormErrorMesg
FormErrorMesg.propTypes = {
    name: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
};

export {
    LightboxForm as default,
    FormRow,
    FormErrorMesg,
    FormSuccessMesg,
    ErrorMesg,
    OtherErrorMesg,
};
