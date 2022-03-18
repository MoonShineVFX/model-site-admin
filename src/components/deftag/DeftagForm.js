import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import LightboxFormStyle from '../LightboxFormStyle';
import { DeftagFormLayout } from './DeftagLayout';
import Buttons from '../Buttons';
import { ErrorMesg } from '../LightboxForm';
import Service from '../../utils/util.service';

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
const DeftagForm = ({ data }) => {

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // State
    const [list, setList] = useState(tidyData(data));

    // 送資料
    const handleReqData = (reqData) => {

        Service.deftagUpdate(reqData)
            .then((resData) => setList(tidyData(resData)));

    };

    return (

        <Fragment>
            <LightboxFormStyle />

            <DeftagFormLayout onSubmit={handleSubmit(handleReqData)}>
                <div className="container">
                    <div className="item item-header">
                        <div className="column"></div>
                        <div className="column">zh (繁體中文)</div>
                        <div className="column">en (English)</div>
                    </div>
                    {
                        Object.keys(list).map((index) => (

                            <div key={index} className="item">
                                <div className="column label">
                                    <span>{index}</span>
                                </div>

                                <div className={`column row ${errors?.zh?.[index] ? 'hasError' : ''}`}>
                                    <div className="field">
                                        <input
                                            type="text"
                                            name={`zh.${index}`}
                                            defaultValue={list[index]['zh']}
                                            {...register(`zh.${index}`, { required: true })}
                                        />
                                    </div>
                                    {errors?.zh?.[index] && <ErrorMesg />}
                                </div>

                                <div className="column row">
                                    <div className="field">
                                        <input
                                            type="text"
                                            name={`en.${index}`}
                                            defaultValue={list[index]['en']}
                                            {...register(`en.${index}`)}
                                        />
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>

                <div className="row row-btns">
                    <Buttons
                        text="更新"
                        htmlType="submit"
                    />
                </div>
            </DeftagFormLayout>
        </Fragment>

    );

};

export default DeftagForm;
