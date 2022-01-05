import { Row } from 'antd';
import styled from 'styled-components';
import Buttons from '../../components/Buttons';

// 返回列表按鈕
const BackToLayout = styled(Buttons)({
    float: 'none',
});

// 詳細頁 > 兩欄
const DetailWrapLayout = styled(Row)(({ theme }) => ({
    '.left': {
        borderRight: `1px solid ${theme.palette.border}`,
    },
}))

// 訂單詳細資訊
const InfoWrapLayout = styled.div(({ theme }) => ({
    maxWidth: '600px',
    border: `1px solid ${theme.palette.border}`,
    padding: '40px 20px',
    '.info-row': {
        marginBottom: '10px',
        display: 'flex',
    },
    '.title': {
        maxWidth: '120px',
        width: '100%',
        textAlign: 'right',
        marginBottom: '0',
        marginRight: '10px',
        '& + div': {
            flex: '0 0 calc(100% - 200px)',
        },
    },
    '.package': {
        textDecoration: 'underline',
    },
}));

// 商品內容
const ProductItemLayout = styled.div(({ theme }) => ({
    '.item': {
        maxWidth: '480px',
        color: theme.palette.font,
        border: `1px solid ${theme.palette.border}`,
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        marginBottom: '12px',
        ':hover': {
            color: theme.palette.blue,
        },
    },
    '.thumb': {
        width: '120px',
        height: '70px',
        marginRight: '10px',
    },
    '.content': {
        flex: '0 0 calc(100% - 120px - 10px)',
    },
}));

export {
    BackToLayout,
    DetailWrapLayout,
    InfoWrapLayout,
    ProductItemLayout,
};
