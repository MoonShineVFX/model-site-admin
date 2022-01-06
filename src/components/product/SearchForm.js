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
    const targetReset = () => reset();

    // 送資料
    const handleReqData = (reqData) => {

        Service.productSearch(reqData)
            .then(({ list }) => {

                globalDispatch({
                    type: 'search',
                    payload: { curr: 'product', list },
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
                        name="query"
                        placeholder="商品名稱"
                        {...register('query')}
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
