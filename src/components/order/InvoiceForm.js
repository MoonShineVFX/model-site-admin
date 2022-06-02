import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Buttons from '../Buttons';
import { FormRow } from '../LightboxForm';
import Service from '../../utils/util.service';

const FormLayout = styled.form({
    display: 'flex',
    alignItems: 'flex-start',
    '.row': {
        marginBottom: '0',
        '.field': {
            minWidth: '160px',
            height: '30px',
            padding: '0 4px',
        },
    },
    'input::placeholder': {
        fontSize: '14px',
    },
    '.ant-btn.admin-btn': {
        width: 'auto',
        height: '30px',
        fontSize: '14px',
        marginLeft: '8px',
        marginRight: '0',
    },
});

//
const InvoiceForm = ({ data }) => {

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: { ...data },
    });

    // 送資料
    const handleReqData = (reqData) => {

        Service.paperInvoiceUpdate(reqData)
            .then(() => message.success('更新成功'));

    };

    return (

        <FormLayout onSubmit={handleSubmit(handleReqData)}>
            <input
                type="hidden"
                name="id"
                {...register('id')}
            />

            <FormRow
                name="invoice"
                required
                errors={errors}
            >
                <input
                    type="text"
                    name="invoice"
                    placeholder="請輸入發票號碼"
                    maxLength="10"
                    {...register('invoice', {
                        required: true,
                        maxLength: {
                            value: 10,
                            message: '最多10碼',
                        },
                    })}
                />
            </FormRow>

            <Buttons
                text="送出"
                htmlType="submit"
            />
        </FormLayout>

    );

};

export default InvoiceForm;
