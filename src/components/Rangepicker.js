import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const Rangepicker = ({ onChange }) => (

    <RangePicker
        placeholder={['起始日', '結束日']}
        ranges={{
            '今天': [moment(), moment()],
            '這個月': [moment().startOf('month'), moment().endOf('month')],
        }}
        onChange={onChange}
        allowEmpty={[true, true]}
        locale={{
            lang: {
                locale: 'zh-tw',
                yearFormat: 'YYYY 年',
                monthFormat: 'MM 月',
            }
        }}
    />

);

Rangepicker.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default Rangepicker;
