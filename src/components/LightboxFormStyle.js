import { white, blue, red, grey } from '@ant-design/colors';
import { createGlobalStyle } from 'styled-components';

const LightboxFormStyle = createGlobalStyle`
    .lightbox-wrap {
        .small-text {
            color: ${grey[2]};
        }
    }
    .noBorder {
        height: 34px;
        background-color: ${white};
        padding: 4px 12px;
        transition: all .3s ease-in-out;
        outline: 0;
    }
    .row {
        display: block;
        margin-bottom: 20px;
        .title {
            margin-bottom: 2px;
            cursor: default;
        }
        .field {
            height: 34px;
            font-size: 15px;
            background-color: ${white};
            border: 1px solid ${({ theme }) => theme.palette.border};
            border-radius: 2px;
            padding: 4px 8px;
            transition: all .3s ease-in-out;
            outline: 0;
            &:hover,
            &:focus {
                border-color: ${blue.primary};
            }
            &:focus {
                box-shadow: 0 0 1px 2px rgba(33, 150, 243, .3);
            }
            > * {
                &:not(.ant-switch) {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .disabled, .readonly {
            background-color: ${({ theme }) => theme.palette.disabled};
            border-color: ${({ theme }) => theme.palette.border};
            cursor: not-allowed;
            &:hover,
            &:focus {
                border-color: ${({ theme }) => theme.palette.border};
            }
            [disabled] {
                background-color: ${({ theme }) => theme.palette.disabled};
                cursor: not-allowed;
                &:hover {
                    border-color: ${({ theme }) => theme.palette.border};
                }
            }
            [readonly] {
                cursor: not-allowed;
            }
        }
        .ant-picker {
            width: 100%;
            height: 34px;
            &:focus,
            &:active {
                border: 1px solid ${blue.primary};
                box-shadow: none;
                outline: 0;
            }
            &.ant-picker-focused {
                box-shadow: none;
                .ant-picker-active-bar {
                    display: none;
                }
            }
            .ant-picker-input {
                &:focus {
                    outline: 0;
                }
                input {
                    font-size: 15px;
                    letter-spacing: 1px;
                }
            }
        }
        .noBorder {
            border: 0;
            padding: 0;
            select {
                padding: 4px 8px;
            }
        }
        .ant-input,
        select {
            height: 34px;
            font-size: 15px;
        }
        select {
            font-size: 15px;
            border-color: ${({ theme }) => theme.palette.border};
            border-radius: 2px;
            padding: 4px 12px;
            transition: all .3s ease-in-out;
            &:hover {
                border-color: ${blue.primary};
            }
        }
        textarea {
            height: 100%;
            line-height: 1.4;
            font-size: 15px;
            color: ${({ theme }) => theme.palette.font};
            resize: none;
            outline: 0;
        }
        &.textarea {
            .field {
                min-height: 100px;
            }
        }
    }
    .checkboxes .field {
        height: auto;
    }
    .row-btns {
        text-align: center;
        margin-top: 20px;
        .ant-btn {
            height: auto;
            line-height: initial;
            padding: 8px 40px;
        }
        .ant-btn-primary {
            margin-left: 20px;
        }
        [class*="btn-"] {
            margin: 0 20px;
        }
    }
    .isRequired {
        &:before {
            content: '*';
            font-size: 13px;
            color: ${red.primary};
            display: inline-block;
            vertical-align: middle;
            margin-right: 4px;
        }
    }
    .hasError {
        .field {
            border-color: ${red[4]};
            &:hover {
                border-color: ${red[4]};
            }
        }
        .error {
            font-size: 15px;
            color: ${red[4]};
            margin: 2px 0;
        }
        .noBorder select {
            border-color: ${red[4]};
        }
    }
    .error-mesg {
        font-size: 15px;
        color: ${red[4]};
        margin-top: 2px;
        margin-bottom: 0;
    }
    .success-mesg {
        text-align: center;
    }

    // 語系
    .lightbox-deftag-wrap {
        .ant-modal-body {
            padding: 30px;
        }
    }
`;

export default LightboxFormStyle;
