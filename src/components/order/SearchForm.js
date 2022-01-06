import { Fragment, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import LightboxFormStyle from '../LightboxFormStyle';
import Buttons from '../Buttons';
import Rangepicker from '../Rangepicker';
import { SearchFormLayout } from './OrderLayout';

import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';

const SearchForm = () => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register, reset } = useForm();

    // State
    const [selectedDate, setSelectedDate] = useState([]);

    // 選日期
    const handleChangeDate = (date, dateString) => setSelectedDate(dateString);

    // reset
    const targetReset = () => reset();

    // 送資料
    const handleReqData = (reqData) => {

        const [startDate, endDate] = selectedDate;

        reqData = {
            ...reqData,
            startDate,
            endDate,
        };

        Service.orderSearch(reqData)
            .then(({ list }) => {

                globalDispatch({
                    type: 'search',
                    payload: { curr: 'order', list },
                });

            });

    };

    return (

        <Fragment>
            <LightboxFormStyle />

            <SearchFormLayout onSubmit={handleSubmit(handleReqData)}>
                <span>搜尋: </span>

                <span className="input">
                    <input
                        type="text"
                        name="account"
                        placeholder="會員帳號"
                        {...register('account')}
                    />
                </span>

                <span className="input">
                    <input
                        type="text"
                        name="orderNumber"
                        placeholder="訂單編號"
                        {...register('orderNumber')}
                    />
                </span>

                <span className="input">
                    <input
                        type="text"
                        name="tradeNumber"
                        placeholder="交易序號"
                        {...register('tradeNumber')}
                    />
                </span>

                <span className="input">
                    <input
                        type="text"
                        name="invoice"
                        placeholder="發票號碼"
                        {...register('invoice')}
                    />
                </span>

                <span>
                    <Rangepicker onChange={handleChangeDate} />
                </span>

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

SearchForm.defaultProps = {
    // newPage: false,
};

SearchForm.propTypes = {
    children: PropTypes.any,
};

export default SearchForm;
