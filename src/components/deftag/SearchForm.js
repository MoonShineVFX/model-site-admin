import { Fragment, useContext } from 'react';
import { useForm } from 'react-hook-form';
import LightboxFormStyle from '../LightboxFormStyle';
import Buttons from '../Buttons';
import { SearchFormLayout } from '../order/OrderLayout';
import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';

const SearchForm = () => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register, reset } = useForm();

    // reset
    const targetReset = () => {

        reset();
        globalDispatch({
            type: 'search',
            payload: { curr: '', list: null },
        });

    };

    // 送資料
    const handleReqData = (reqData) => {

        Service.deftagSearch(reqData)
            .then((resData) => {

                globalDispatch({
                    type: 'search',
                    payload: { curr: 'deftag', list: resData },
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
                        name="key"
                        placeholder="索引值"
                        {...register('key')}
                    />
                </span>

                <span className="input">
                    <input
                        type="text"
                        name="value"
                        placeholder="翻譯文字"
                        {...register('value')}
                    />
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

export default SearchForm;
