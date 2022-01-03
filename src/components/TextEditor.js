import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { blue } from '@ant-design/colors';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';
import { GlobalContext } from '../context/global.state';
import Service from '../utils/util.service';

//
const htmlToDraft = (typeof window === 'object') && require('html-to-draftjs').default;

// 動態載入模組
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((module) => module.Editor),
    { ssr: false },
);

const EditorLayout = styled.div(({ theme }) => ({
    minHeight: '70vh',
    border: `1px solid ${theme.palette.border}`,
    overflow: 'hidden',
    '.adminEditor-wrapper, .DraftEditor-root': {
        height: '100%',
    },
    '.adminEditor-wrapper *': {
        boxSizing: 'initial',
    },
    '.adminEditor-toolbar': {
        border: 0,
        borderBottom: `1px solid ${theme.palette.border}`,
        padding: '10px 10px 6px',
        'a': {
            color: theme.palette.font,
        },
    },
    '.adminEditor-editor': {
        height: 'calc(100% - 58px - 58px)', // toolbar: 58px, button: 58px
        padding: '10px 12px',
        'a[href] span': {
            color: blue.primary,
            textDecoration: 'underline',
        },
    },
    '.public-DraftStyleDefault-block': {
        margin: 0,
    },
    '.rdw-option-wrapper, .rdw-dropdown-wrapper': {
        '&:hover': {
            borderColor: '#CDCDCD',
            boxShadow: 'none',
            '.rdw-dropdown-optionwrapper': {
                borderColor: '#CDCDCD',
                boxShadow: 'none',
            },
        },
    },
    '.rdw-link-modal': {
        '.rdw-link-modal-label': {
            lineHeight: 1,
        },
        'input': {
            padding: '4px 8px',
        },
    },
}));

const TextEditor = ({ content }) => {

    // Context
    const { formStorageData, formStorageDispatch } = useContext(GlobalContext);

    // State
    const [editor, setEditor] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {

        setEditor(true);

        const contentBlock = htmlToDraft(content);

        if (contentBlock) {

            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);

        }

    }, [content]);

    //
    const handleEditorChange = (state) => {

        setEditorState(state);
        formStorageDispatch({
            type: 'COLLECT',
            payload: {
                ...formStorageData,
                detail: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            },
        });

    };

    // 上傳圖片
    const uploadImageCallBack = async (file) => {

        // FormData 上傳圖片
        const formData = new FormData();
        formData.append('file', file);

        const res = await Service.fileUploadEditor(formData);
        const { imgUrl } = res;

        // 預覽已上傳圖片
        return new Promise((resolve, reject) => {

            const reader = new FileReader();
            reader.onload = () => resolve({ data: { link: imgUrl }});
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);

        });

    };

    return (

        <EditorLayout>
            {
                editor &&
                    <Editor
                        wrapperClassName="adminEditor-wrapper"
                        toolbarClassName="adminEditor-toolbar"
                        editorClassName="adminEditor-editor"
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        localization={{ locale: 'zh_tw' }}
                        toolbar={{
                            image: {
                                previewImage: true,
                                inputAccept: 'image/jpeg,image/jpg,image/png',
                                // 先註解，若覺得圖片太大需要 default 再拔掉
                                // defaultSize: {
                                //     width: '300',
                                //     height: 'auto',
                                // },
                                uploadCallback: uploadImageCallBack,
                            },
                        }}
                    />
            }
        </EditorLayout>

    );

};

TextEditor.propTypes = {
    content: PropTypes.any.isRequired,
};

export default TextEditor;

/**
 * Example
 * https://github.com/jpuri/react-draft-wysiwyg/tree/master/stories
 * https://www.gyanblog.com/javascript/how-integrate-next-js-draft-js-strapi-create-article-upload-image-view-page
 */
