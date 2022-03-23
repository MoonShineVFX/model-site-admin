import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Buttons from './Buttons';
import LightboxForm from './LightboxForm';
import Prompt from './Prompt';
import { GlobalContext } from '../context/global.state';
import utilConst from '../utils/util.const';

const { langs, lightboxTitle } = utilConst;

//
const DeftagDataFormLayout = styled.form(({ theme }) => ({
    '.container': {
        display: 'flex',
    },
    'h3': {
        fontWeight: 'bold'
    },
    '.item': {
        flex: '1',
        padding: '20px',
    },
    '.default-lang': {
        height: '120px',
        border: `1px solid ${theme.palette.border}`,
        padding: '8px 12px',
        cursor: 'default',
    },
    '.defaultMask': {
        backgroundColor: '#EEE',
    },
    '.row.textarea .field': {
        minHeight: '120px',
    },
}));

//
const DeftagDataForm = ({ handleGetData, handleUpdateData }) => {

    // Context
    const {
        isShow,
        curr,
        langCode,
        deftagFormDispatch,
    } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register } = useForm();

    // State
    const [list, setList] = useState({});

    // fetch
    useEffect(() => {

        handleGetData()
            .then((resData) => {

                setList(resData);

                // Fake
                // setList({
                //     "zh": {
                //         "title": "標題",
                //         "description": "描述"
                //     },
                //     "en": {
                //         "title": "Title",
                //         "description": "Description"
                //     }
                // });

            });

    }, [handleGetData]);

    // 隱藏 Modal
    const hideModal = () => deftagFormDispatch({ type: 'HIDE' });

    // 送資料
    const handleReqData = (reqData) => {

        reqData = { ...reqData, code: langCode };
        console.log('reqData:', reqData)

        // return;
        handleUpdateData(reqData)
            .then(() => Prompt('success'));

    };

    return (

        <LightboxForm
            width={800}
            title={lightboxTitle[curr]}
            visible={isShow}
            handleCancel={hideModal}
            className="lightbox-deftag-wrap"
        >
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
                        onClick={hideModal}
                    />
                </div>
            </DeftagDataFormLayout>
        </LightboxForm>

    );

};

DeftagDataForm.propTypes = {
    handleGetData: PropTypes.func,
    handleUpdateData: PropTypes.func,
};

export default DeftagDataForm;
