import { Fragment, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import LightboxFormStyle from '../LightboxFormStyle';
import { DeftagFormLayout } from './DeftagLayout';
import Buttons from '../Buttons';
import { GlobalContext } from '../../context/global.state';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { lang } = utilConst;

// 整理資料結構
const arrangeData = (data) => Object.keys(data).reduce((acc, code) => {

    return Object.keys(data[code]).reduce((_acc, _obj) => {

        acc[_obj] = acc[_obj] || {};
        acc[_obj] = {
            ...acc[_obj],
            [code]: data[code][_obj],
        };

        return acc;

    }, {});

}, {});

// Item
const ItemWrap = ({ code, data, register }) => (

    <div className="items">
        <h3 className="title">({code}) {lang[code]}</h3>

        <div className="row-item">
            {
                Object.keys(data[code]).map((key) => (

                    <div key={key} className="row">
                        <div className="label">{key}</div>
                        <div className="field">
                            <input
                                type="text"
                                name={key}
                                defaultValue={data[code][key]}
                                // {...register(key)}
                            />
                        </div>
                    </div>

                ))
            }
        </div>
    </div>

);

//
const DeftagForm = ({ data }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register} = useForm();

    // State
    const [list, setList] = useState(arrangeData(data));

    // 送資料
    const handleReqData = (reqData) => {

        console.log('reqData:', reqData)

        // reqData = {
        //     ...reqData,
        // };

        // Service.deftagSearch(reqData)
        //     .then((resData) => {

        //         globalDispatch({
        //             type: 'search',
        //             payload: { curr: 'deftag', list },
        //         });

        //     });

    };

    return (

        <Fragment>
            <LightboxFormStyle />

            <DeftagFormLayout onSubmit={handleSubmit(handleReqData)}>
                <div className="container">
                    <div className="item item-header">
                        <div className="column"></div>
                        <div className="column">(zh) 繁體中文</div>
                        <div className="column">(en) English</div>
                    </div>
                    {
                        Object.keys(list).map((index) => (

                            <div key={index} className="item">
                                <div className="column label">{index}</div>

                                <div className="column row">
                                    <div className="field">
                                        <input
                                            type="text"
                                            name={`zh_${index}`}
                                            defaultValue={list[index]['zh']}
                                            {...register(`zh_${index}`)}
                                        />
                                    </div>
                                </div>

                                <div className="column row">
                                    <div className="field">
                                        <input
                                            type="text"
                                            name={`en_${index}`}
                                            defaultValue={list[index]['en']}
                                            {...register(`en_${index}`)}
                                        />
                                    </div>
                                </div>
                            </div>

                        ))
                    }

                    {/* {
                        Object.keys(data).map((code) => (

                            <ItemWrap
                                key={code}
                                code={code}
                                data={data}
                                register={register}
                            />

                        ))
                    } */}
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
