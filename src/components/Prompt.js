import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { ExclamationCircleOutlined  } from '@ant-design/icons';
import PromptStyle from './PromptStyle';
import utilConst from '../utils/util.const';

const { confirm } = Modal;
const { prompts, sendSuccessText } = utilConst;

const Prompt = (type, obj) => {

    <PromptStyle />
    return (type === 'confirm') ? (

        confirm({
            title: obj.title,
            icon: <ExclamationCircleOutlined />,
            content: obj.mesg,
            okText: '確認',
            okType: 'primary',
            cancelText: '取消',
            className: `prompt-wrap prompt-confirm ${obj.className ? obj.className : ''}`,
            centered: true,
            onOk: () => {

                if (obj.callback) obj.callback();

            },
        })

    ) : (

        Modal[type]({
            title: prompts[type],
            content: obj?.mesg ? (
                <Fragment>
                    {sendSuccessText}
                    <p>{obj.mesg}</p>
                </Fragment>
            ) : sendSuccessText,
            okText: '確認',
            okType: 'primary',
            className: `prompt-wrap prompt-${type}`,
            centered: true,
            keyboard: !(type === 'success'),
            ...obj?.callback && {
                onOk: () => new Promise((resolve) => {

                    setTimeout(() => {

                        obj.callback();
                        resolve();

                    }, 3000);

                })
                .catch(() => console.log('Oops errors!')),
            },
        })

    );

};

Prompt.defaultProps = {
    type: 'info',
};

Prompt.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    mesg: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    className: PropTypes.string,
    enableEsc: PropTypes.bool,
    callback: PropTypes.func,
};

export default Prompt;
