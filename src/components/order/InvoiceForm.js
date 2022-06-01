import { Fragment } from 'react';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Buttons from '../Buttons';
import { ErrorMesg } from '../LightboxForm';
import Service from '../../utils/util.service';

const FormLayout = styled.form({
    display: 'flex',
    '.row': {
        marginBottom: '0',
        '.field': {
            height: '30px',
            padding: '0 4px',
        },
    },
    'input::placeholder': {
        fontSize: '14px',
    },
    '.ant-btn.admin-btn': {
        width: 'auto',
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

        <Fragment>
            <FormLayout onSubmit={handleSubmit(handleReqData)}>
                <input
                    type="hidden"
                    name="id"
                    {...register('id')}
                />
                <div className="row">
                    <div className="field">
                        <input
                            type="text"
                            name="invoice"
                            placeholder="請輸入發票號碼"
                            {...register('invoice', { required: true })}
                        />
                    </div>
                </div>
                <Buttons
                    text="送出"
                    htmlType="submit"
                />
            </FormLayout>

            {errors.invoice && <ErrorMesg />}
        </Fragment>

    );

};

export default InvoiceForm;
