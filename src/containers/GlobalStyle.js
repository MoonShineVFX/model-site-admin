import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-size: 1em;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    h1, h2, h3, h4, h5, h6 {
        margin-bottom: 20px;
    }
    h1 {
        font-size: 26px;
        font-weight: bold;
    }
    p {
        margin-bottom: 16px;
    }
    ul {
        padding-inline-start: 20px;
    }
    input, textarea {
        background-color: transparent;
        border: none;
        box-shadow: none;
        outline: 0;
    }
    select, textarea {
        outline: 0;
    }
    textarea {
        width: 100%;
        height: 100%;
        resize: none;
    }
    .admin-tables {
        .ant-image {
            vertical-align: middle;
        }
        img {
            width: 100%;
        }
    }
    .ant-tag {
        font-size: 14px;
        margin-right: 6px;
        padding: 2px 10px;
        cursor: default;
    }
    .admin-btn.ant-btn a {
        letter-spacing: 0px;
        display: inline-block;
        margin-right: 0;
    }
`;

export default GlobalStyle;
