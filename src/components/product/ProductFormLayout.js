import { Row } from 'antd';
import styled from 'styled-components';

/** Product Form */
//
const FormWrap = styled.form({
    '.right': {
        // maxWidth: '600px',
        marginLeft: '40px',
    },
    '.upload-preview': {
        minHeight: '312px',
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
    '.row.textarea .field': {
        minHeight: '180px',
    },
    '.row-btns': {
        textAlign: 'left',
        marginTop: '20px',
        '> *': {
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
//
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
    FormWrap,
    PlaceOtherFormWrapLayout,
    ImagesWrapLayout,
};
