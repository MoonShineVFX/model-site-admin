import styled from 'styled-components';

// 詳細頁 > 兩欄
const DeftagFormLayout = styled('form')(({ theme }) => ({
    '.items': {
        border: `1px solid ${theme.palette.border}`,
        flex: '1',
        margin: '0 20px',
        padding: '30px',
    },
    '.title': {
        fontWeight: 'bold',
        marginTop: '0',
        marginBottom: '10px',
    },
    '.row:not(.row-btns)': {
        marginBottom: '16px',
    },
    '.label span': {
        display: 'inline-block',
        marginTop: 'calc((34px - 18px) / 2)',

    },
    '.row-btns': {
        textAlign: 'left',
        '.admin-btn': {
            width: '160px',
            margin: '0',
        },
    },

    '.item': {
        display: 'flex',
        marginBottom: '10px',
    },
    '.item-header': {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    '.column': {
        marginRight: '20px',
        '&:not(.label)': {
            maxWidth: '300px',
            marginBottom: '0',
            flex: '1',
        },
    },
    '.label': {
        width: '300px',
        lineHeight: '1.2',
        wordBreak: 'break-word',
    },
}));

export { DeftagFormLayout };
