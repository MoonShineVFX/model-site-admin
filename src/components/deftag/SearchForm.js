import { Fragment, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import LightboxFormStyle from '../LightboxFormStyle';
import Buttons from '../Buttons';
import { SearchFormLayout } from '../order/OrderLayout';
import { GlobalContext } from '../../context/global.state';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { lang } = utilConst;

const SearchForm = ({ options }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register, reset } = useForm();

    // State
    // const [selectedDate, setSelectedDate] = useState([today, today]); // 預設代今日

    // reset
    const targetReset = () => {

        reset();
        globalDispatch({
            type: 'search',
            payload: { curr: '', list: [] },
        });

    };

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

            <SearchFormLayout onSubmit={handleSubmit(handleReqData)}>
                <span>搜尋: </span>

                <span className="input">
                    <input
                        type="text"
                        name="query"
                        placeholder="索引值或關鍵字"
                        {...register('query')}
                    />
                </span>

                <select
                    name="code"
                    className="input"
                    {...register('code')}
                >
                    <option value="">選擇語系</option>
                    {
                        Object.keys(options).map((code) => (

                            <option
                                key={code}
                                value={code}
                            >
                                {lang[code]}
                            </option>

                        ))
                    }
                </select>

                <Buttons
                    text="查詢"
                    htmlType="submit"
                />

                <Buttons
                    text="清除"
                    type="default"
                    onClick={targetReset}
                />
            </SearchFormLayout>
        </Fragment>

    );

};

export default SearchForm;
