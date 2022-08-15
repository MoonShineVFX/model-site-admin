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
});

/** Warning Mesg */
const WarningLayout = styled(Alert)({
    fontSize: '16px',
    margin: '20px 0',
    '.warning-text': {
        fontWeight: 'bold',
    },
});

export {
    RowWrapLayout,
    WarningLayout,
};
