import { Fragment, useContext } from 'react';
import { useForm } from 'react-hook-form';
import LightboxFormStyle from '../LightboxFormStyle';
import Buttons from '../Buttons';
import { SearchFormLayout } from '../order/OrderLayout';
import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';

const SearchForm = ({ options }) => {

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

        // Fake
        const list = {
            "zh": {
                "product_detail_format_and_renderer": "軟體格式與算圖引擎",
                "product_detail_notice": "購買後，可以在我的模型庫下載其他檔案格式"
            },
            "en": {
                "product_detail_format_and_renderer": "Format And Renderer",
                "product_detail_notice": ""
            }
        };

        console.log('reqData:', reqData)

        globalDispatch({
            type: 'search',
            payload: { curr: 'deftag', list },
        });

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
                        name="key"
                        placeholder="索引值"
                        {...register('key')}
                    />
                </span>

                <span className="input">
                    <input
                        type="text"
                        name="value"
                        placeholder="文字"
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
