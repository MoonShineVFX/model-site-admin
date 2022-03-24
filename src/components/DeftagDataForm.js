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
const DeftagDataForm = ({ handleFetchData, handleUpdateData }) => {

    // Context
    const {
        isShow,
        curr,
        deftag,
        globalDispatch,
        deftagFormDispatch,
    } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register } = useForm();

    // State
    const [list, setList] = useState({});

    // fetch
    useEffect(() => {

        handleFetchData()
            .then((resData) => setList(resData));

    }, []);

    // 隱藏 Modal
    const hideModal = () => {

        globalDispatch({ type: 'deftag', payload: { code: '', id: null } });
        deftagFormDispatch({ type: 'HIDE' });

    };

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            langCode: deftag.code,
            ...deftag.id && { id: deftag.id },
        };

        handleUpdateData(reqData)
            .then(() => {

                Prompt('success');
                hideModal();

            });

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
    handleFetchData: PropTypes.func,
    handleUpdateData: PropTypes.func,
};

export default DeftagDataForm;
