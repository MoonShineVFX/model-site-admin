import { Col } from 'antd';
import { blue } from '@ant-design/colors';
import styled from 'styled-components';
import LightboxForm from '../LightboxForm';
import Tables from '../Tables';

/** Tag List */
const ColLayout = styled(Col)({
    marginLeft: '10px',
});

const TagFormLayout = styled.div(({ theme }) => ({
    border: `1px solid ${theme.palette.border}`,
    padding: '30px',
    '.items': {
        display: 'flex',
        '.row': {
            flex: 1,
            '&:not(:last-child)': {
                marginRight: '20px',
            },
        },
    },
    '.row-btns': {
        textAlign: 'left',
        margin: '10px 0 0',
        '.admin-btn': {
            margin: '0 20px 0 0',
        },
    },
}));

const UpdateTagFormLayout = styled(LightboxForm).attrs(() => ({
    className: 'updateTagForm',
}))({
    '.row-create-field, .btn-clone': {
        display: 'none',
    },
    '.items .row:nth-child(2)': {
        marginRight: 0,
    },
    'p': {
        display: 'block',
    },
});

const TablesLayout = styled(Tables)(() => ({
    '*': {
        fontSize: '15px',
    },
    '.ant-tag': {
        fontSize: '14px',
    },
}));

/** Tag Form */
const ActionLayout = styled.div.attrs(() => ({
    className: 'btn-clone',
}))({
    color: blue.primary,
    textAlign: 'right',
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    '& > *': {
        cursor: 'pointer',
    },
    '*': {
        fontSize: '1.16em',
    },
    '.hide': {
        visibility: 'hidden',
    },
});

const CreateFieldLayout = styled.div.attrs(() => ({
    className: 'row row-create-field',
}))({
    fontSize: '14px',
    color: blue.primary,
    textDecoration: 'underline',
    '& + p': {
        display: 'none',
    },
    'span': {
        cursor: 'pointer',
    },
});

export {
    ColLayout,
    TagFormLayout,
    UpdateTagFormLayout,
    TablesLayout,
    ActionLayout,
    CreateFieldLayout,
};
