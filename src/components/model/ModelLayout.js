import { Alert } from 'antd';
import styled from 'styled-components';

const RowWrapLayout = styled.div({
    '.admin-btn': {
        marginBottom: '0',
    },
    '.other-fields': {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '5px',
        '.row': {
            marginBottom: '0',
        },
        '> *': {
            margin: '0 5px',
        },
    },
    '.ant-upload-list': {
        marginTop: '40px',
    },
    '.count': {
        fontSize: '15px',
        marginBottom: '10px',
    },
    '.ant-upload-list-picture-container:not(:first-child)': {
        '.count': {
            display: 'none',
        },
    },
});

/** Warning Mesg */
const WarningLayout = styled(Alert)({
    fontSize: '16px',
    margin: '20px 0',
    'ul': {
        marginBottom: '0',
    },
    '.warning-text': {
        fontWeight: 'bold',
    },
});

// 上傳檔案列表
const ItemWrapLayout = styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    '> *': {
        flex: '1',
    },
    '.fileWrap': {
        maxWidth: '460px',
        fontSize: '16px',
        border: '1px solid #d9d9d9',
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        transition: 'all 0.5s ease',
        '&:hover': {
            backgroundColor: '#F0F2F5',
            cursor: 'default',
        },
    },
    '.fileAttach': {
        fontSize: '14px',
    },
    '.fileInfo': {
        lineHeight: '1.4',
        flex: '1',
        padding: '0 8px',
    },
    '.small-info': {
        fontSize: '13px',
        color: 'grey',
    },
    '.btn-delete': {
        fontSize: '18px',
        color: 'grey',
        padding: '8px 4px',
        cursor: 'pointer',
    },
    '.fileLogs': {
        color: 'grey',
        marginLeft: '20px',
    },
    '.creator': {
        fontStyle: 'italic',
        textDecoration: 'underline',
    },
}));

export {
    RowWrapLayout,
    WarningLayout,
    ItemWrapLayout,
};
