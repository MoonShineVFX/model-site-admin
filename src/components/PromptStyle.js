import { createGlobalStyle } from 'styled-components';

const PromptStyle = createGlobalStyle`
    .prompt-wrap {
        .data {
            font-weight: bold;
        }
        .ant-modal-confirm-body {
            > * {
                &:not(.ant-modal-confirm-content) {
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .ant-modal-confirm-content {
                font-size: 16px;
                margin: 16px 48px 40px;
                * {
                    font-size: 16px;
                }
            }
            .anticon {
                float: none;
                svg {
                    font-size: 1.4rem;
                }
            }
            .ant-modal-confirm-title {
                font-size: 1.4rem;
            }
        }
        .ant-modal-confirm-btns {
            text-align: center;
            float: none;
            .ant-btn {
                height: auto;
                line-height: initial;
                padding: 8px 40px;
            }
            .ant-btn-primary {
                margin-left: 20px;
            }
        }
    }
`;

export default PromptStyle;
