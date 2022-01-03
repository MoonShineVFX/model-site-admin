import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import LightboxFormStyle from './LightboxFormStyle';
import utilConst from '../utils/util.const';

const { errorText } = utilConst;

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
        marginBottom: '4px',
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

// Form 欄位
const FormRow = ({
    labelTitle,
    required,
    children,
    error,
    errorMesg,
    className,
    notes,
    noBorder,
}) => (

    <label className={`row ${error ? 'hasError' : ''} ${className && className}`}>
        <Fragment>
            <div className={`title ${required ? 'isRequired' : ''}`}>
                {
                    (typeof labelTitle === 'string') ? `${labelTitle}${required ? ' (必填)' : ''}` : labelTitle
                }
            </div>
            <div className={`field ${noBorder ? 'noBorder' : ''}`}>{children}</div>

            {
                notes &&
                    <div className="notes">
                        <ExclamationCircleOutlined />{notes}
                    </div>
            }
        </Fragment>

        {
            error && <ErrorMesg {...errorMesg ? { error: errorMesg } : null} />
        }
    </label>

);

// Lightbox Form
const LightboxForm = ({
    visible,
    width,
    title,
    className,
    handleCancel,
    children,
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
        >
            {children}
        </LightboxFormLayout>
    </Fragment>

);

// FormRow
FormRow.defaultProps = {
    required: false,
    noBorder: false,
    error: false,
    errorMesg: errorText,
    className: '',
};

FormRow.propTypes = {
    className: PropTypes.string,
    labelTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    required: PropTypes.bool,
    noBorder: PropTypes.bool,
    error: PropTypes.bool,
    errorMesg: PropTypes.string,
    children: PropTypes.any.isRequired,
    notes: PropTypes.string,
};

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

export {
    LightboxForm as default,
    FormRow,
    ErrorMesg,
    OtherErrorMesg,
};
