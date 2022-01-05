import { Row } from 'antd';
import styled from 'styled-components';

/** Product Detail */
const DetailWrapLayout = styled(Row)(({ theme }) => ({
    '.right': {
        borderLeft: `1px solid ${theme.palette.border}`,
    },
    '.btn-create': {
        float: 'none',
    },
}));

/** Product Form */
const FormWrap = styled.form({
    '.items': {
        display: 'flex',
        '.row': {
            flex: 1,
            '&:not(:last-child)': {
                marginRight: '20px',
            },
        },
    },
    '.row.textarea .field': {
        minHeight: '180px',
    },
    '.row-btns': {
        textAlign: 'left',
        marginTop: '20px',
        '.admin-btn': {
            width: '200px',
            marginLeft: '0',
            marginRight: '20px',
        },
    },
    '.row.radio-button .field': {
        'label': {
            marginRight: '20px',
            cursor: 'pointer',
        },
        'input[type="radio"]': {
            verticalAlign: 'middle',
            marginRight: '4px',
        },
    },
    'hr': {
        margin: '30px 0',
    },
    'h3': {
        fontWeight: 'bold',
    },
});

/** Product Other Fields Form */
const PlaceOtherFormWrapLayout = styled(Row)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.border}`,
    marginTop: '40px',
    paddingTop: '40px',
    'h3': {
        fontWeight: 'bold',
    },
    '.ant-col': {
        paddingRight: '40px',
    },
    '.upload-preview': {
        maxWidth: '778px',
        height: '438px',
    },
    '.ant-upload-list-item-info': {
        display: 'inline-block',
    },
}));

//
const ImagesWrapLayout = styled.div({
    border: '1px solid',
    marginBottom: '20px',
});

export {
    DetailWrapLayout,
    FormWrap,
    PlaceOtherFormWrapLayout,
    ImagesWrapLayout,
};
