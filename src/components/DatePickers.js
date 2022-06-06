import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

// 語系設定
const locale = {
    lang: {
        locale: 'zh-tw',
        yearFormat: 'YYYY 年',
        monthFormat: 'MM 月',
    }
};

const DatePickers = ({ mode, onChange }) => (

    <DatePicker
        placeholder="選取月份"
        picker={mode}
        onChange={onChange}
        locale={locale}
    />

);

const RangePickers = ({ mode, onChange }) => {

    const str = (mode === 'month') ? '月' : '日';
    const placeholder = [`起始${str}`, `結束${str}`];

    return (

        <RangePicker
            placeholder={placeholder}
            picker={mode}
            ranges={{
                '今天': [moment(), moment()],
                '這個月': [moment().startOf('month'), moment().endOf('month')],
            }}
            onChange={onChange}
            allowEmpty={[true, true]}
            locale={locale}
        />

    );

};

DatePickers.defaultProps = {
    mode: 'month',
};

DatePickers.propTypes = {
    mode: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

RangePickers.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export {
    DatePickers as default,
    RangePickers,
};
