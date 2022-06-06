import { useState } from 'react';
import Buttons from '../Buttons';
import { RangePickers } from '../DatePickers';
import { OrderExportLayout } from './OrderLayout';
import Service from '../../utils/util.service';

const OrderExportForm = () => {

    // State
    const [selectedMonth, setSelectedMonth] = useState('');

    // 選日期
    const handleSelectMonth = (date, dateString) => {

        console.log('dateString:', dateString);
        setSelectedMonth(dateString);

    };

    // 匯出檔案
    const handleExport = () => {

        const [start, end] = selectedMonth;
        window.open(Service.orderExport(`start=${start}&end=${end}`));

    };

    return (

        <OrderExportLayout>
            <RangePickers
                mode="month"
                onChange={handleSelectMonth}
            />

            <Buttons
                text="匯出資料"
                onClick={handleExport}
            />
        </OrderExportLayout>

    );

};

export default OrderExportForm;
