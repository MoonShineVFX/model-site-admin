import { Row } from 'antd';
import styled from 'styled-components';
import Buttons from '../../components/Buttons';

// 列表搜尋
const SearchFormLayout = styled.form(({ theme }) => ({
    marginBottom: '30px',
    '.input': {
        height: '34px',
        fontSize: '0.9em',
        display: 'inline-block',
        borderRadius: '2px',
        border: `1px solid ${theme.palette.border}`,
        marginRight: '10px',
        padding: '4px 12px',
        transition: 'all .3s ease-in-out',
        ':hover, :focus': {
            borderColor: theme.palette.blue,
        },
    },
    '.ant-picker': {
        height: '34px',
        borderRadius: '2px',
        marginRight: '10px',
    },
    '.admin-btn': {
        marginRight: '10px',
    },
}));

// 詳細頁 > 兩欄
const DetailWrapLayout = styled(Row)(({ theme }) => ({
    '.left': {
        borderRight: `1px solid ${theme.palette.border}`,
    },
}))

// 返回列表按鈕
const BackToLayout = styled(Buttons)({
    float: 'none',
});

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
    SearchFormLayout,
    DetailWrapLayout,
    BackToLayout,
    InfoWrapLayout,
    ProductItemLayout,
};
