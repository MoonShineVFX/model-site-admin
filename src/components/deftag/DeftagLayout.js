import { Row } from 'antd';
import styled from 'styled-components';
import Buttons from '../Buttons';

// 詳細頁 > 兩欄
const DeftagFormLayout = styled('form')(({ theme }) => ({
    '.container': {
        // maxWidth: '60%',
        // display: 'flex',
        // margin: '0 -20px',
    },
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
    // '.label': {
    //     marginBottom: '2px',
    // },
    '.row-btns': {
        textAlign: 'left',
        '.admin-btn': {
            width: '160px',
            margin: '0',
        },
    },

    '.item': {
        display: 'flex',
        alignItems: 'center',
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

export {
    DeftagFormLayout,
};
