import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Buttons from './Buttons';
import { GlobalContext } from '../context/global.state';
import utilConst from '../utils/util.const';
import Service from '../utils/util.service';

const { langs } = utilConst;

// 整理資料結構
const tidyData = (data) => Object.keys(data).reduce((acc, code) => {

    return Object.keys(data[code]).reduce((_acc, _obj) => {

        acc[_obj] = acc[_obj] || {};
        acc[_obj] = {
            ...acc[_obj],
            [code]: data[code][_obj],
        };

        return acc;

    }, {});

}, {});

//
const DeftagDataFormLayout = styled.form(({ theme }) => ({
    '.container': {
        display: 'flex',
        margin: '0 -20px',
    },
    'h3': {
        fontWeight: 'bold'
    },
    '.item': {
        flex: '1',
        padding: '20px',
    },
    '.default-lang': {
        height: '100px',
        border: `1px solid ${theme.palette.border}`,
        padding: '8px 12px',
    },
    '.defaultMask': {
        backgroundColor: '#EEE',
    },
}));

//
const DeftagDataForm = ({ data }) => {

    // Fake
    data = {
        "zh": {
            "title": "標題",
            "description": "描述"
        },
        "en": {
            "title": "Title",
            "description": "Description"
        }
    };

    // Context
    const { langCode } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register } = useForm();

    // State
    const [list, setList] = useState(data);

    // 送資料
    const handleReqData = (reqData) => {

        reqData = { ...reqData, code: langCode };
        console.log('reqData:', reqData)

        return;
        Service.deftagUpdate(reqData)
            .then((resData) => setList(tidyData(resData)));

    };

    return (

        <DeftagDataFormLayout onSubmit={handleSubmit(handleReqData)}>
            <div className="container">
                {
                    Object.keys(list).map((code) => (

                        <div
                            key={code}
                            className={`item ${(code === 'zh') ? 'defaultMask' : ''}`}
                        >
                            <h3>{langs[code]} [{code}]</h3>

                            {
                                Object.keys(list[code]).map((index) => (

                                    <div
                                        key={index}
                                        className="row textarea"
                                    >
                                        <div className="title">{index}</div>
                                        <div className="field noBorder">
                                            {
                                                (code !== 'zh') ? (

                                                    <textarea
                                                        name={index}
                                                        defaultValue={list[code][index]}
                                                        {...register(index)}
                                                    />

                                                ) : <div className="default-lang">{list[code][index]}</div>
                                            }
                                        </div>
                                    </div>

                                ))
                            }
                        </div>

                    ))
                }
            </div>

            <div className="row row-btns">
                <Buttons
                    text="送出"
                    htmlType="submit"
                />
                <Buttons
                    text="取消"
                    type="default"
                    // onClick={hideModal}
                />
            </div>
        </DeftagDataFormLayout>

    );

};

export default DeftagDataForm;
