import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Buttons from './Buttons';
import TextEditor from './TextEditor';
import Prompt from './Prompt';
import { GlobalContext } from '../context/global.state';
import Service from '../utils/util.service';

const TextEditorFormLayout = styled.form({
    '.admin-btn': {
        minWidth: '16%',
        marginTop: '20px',
        padding: '6px 24px',
    },
});

const TextEditorForm = ({
    name,
    content,
    serviceKey,
    otherReqData,
    successCallback,
    children,
}) => {

    // Context
    const { formStorageData, formStorageDispatch } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register } = useForm({
        defaultValues: {
            detail: content,
        },
    });

    const handleReqData = (reqData) => {

        reqData = {
            ...otherReqData,
            ...reqData,
            detail: formStorageData.detail ? formStorageData.detail : reqData.detail,
        };

        Service[serviceKey](reqData)
            .then(() => {

                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        successCallback();

                    },
                });

            });

    };

    return (

        <TextEditorFormLayout onSubmit={handleSubmit(handleReqData)}>
            {children}

            <TextEditor content={content} />

            <textarea
                name={name}
                {...register(name)}
                style={{ display: 'none' }}
            />

            <Buttons
                text="儲存"
                htmlType="submit"
            />
        </TextEditorFormLayout>

    );

};

TextEditorForm.defaultProps = {
    name: 'detail',
    content: '',
};

TextEditorForm.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired, // html string
    serviceKey: PropTypes.string.isRequired,
    otherReqData: PropTypes.object,
    successCallback: PropTypes.func.isRequired,
    children: PropTypes.any,
};

export default TextEditorForm;
