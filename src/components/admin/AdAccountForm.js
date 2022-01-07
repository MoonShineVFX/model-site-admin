import { useContext, useState } from 'react';
import router from 'next/router';
import { Switch } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Buttons from '../Buttons';
import { FormRow } from '../LightboxForm';
import { GlobalContext } from '../../context/global.state';

//
const AuthorityWrap = styled.div(({ theme }) => ({
    'h4.title': {
        fontSize: '15px',
        marginBottom: '10px',
    },
    '.row': {
        marginBottom: '4px',
        '> *': {
            display: 'inline-block',
            verticalAlign: 'middle',
        },
        '.title': {
            width: '100px',
            textAlign: 'right',
            marginRight: '10px',
        },
    },
}));

const AdAccountForm = () => {

    // Context
    const {
        currEvent,
        formStorageDispatch,
        lightboxDispatch,
        formStorageData,
    } = useContext(GlobalContext);

    // State
    const [selected, setSelected] = useState({
        handleMaterial: !!formStorageData.handleMaterial,
        handleFinance: !!formStorageData.handleFinance,
        isMax: !!formStorageData.isMax,
    });

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: formStorageData,
    });

    // 隱藏 Modal
    const hideModal = () => {

        formStorageDispatch({ type: 'CLEAR' });
        lightboxDispatch({ type: 'HIDE' });

    };

    // 權限事件
    const handleChange = (checked, event, type) => setSelected({ ...selected, [type]: checked });

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            ...selected,
            ...(currEvent === 'updateAdAccount') && { id: formStorageData.id },
        };

        // 編輯部允許更改帳號
        if (currEvent === 'updateAdAccount') delete reqData.account;

        // Service
        // if (currEvent === 'updateTag') tagUpdate(reqData);
        // else tagCreate(reqData);

    };

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            <FormRow
                labelTitle="帳號"
                {
                    ...(currEvent === 'createAdAccount') ? {
                        required: true,
                        error: errors.account && true,
                    } : {
                        readonly: true,
                    }
                }
            >
                <input
                    type="text"
                    name="account"
                    {...register('account', { required: !!(currEvent === 'createAdAccount') })}
                />
            </FormRow>

            {
                (currEvent === 'createAdAccount') ? (

                    <FormRow
                        labelTitle="密碼"
                        required={true}
                        error={errors.password && true}
                    >
                        <input
                            type="password"
                            name="password"
                            {...register('password', { required: true })}
                        />
                    </FormRow>

                ) : (

                    <div className="row">
                        <div className="title">密碼</div>
                        <div className="field noBorder">
                            <span>
                                <Buttons
                                    className="third"
                                    text="重設密碼"
                                    onClick={() => router.push(`/reset_password?uid=${formStorageData.id}`)}
                                />
                            </span>
                        </div>
                    </div>

                )
            }

            <AuthorityWrap>
                <h4 className="title">權限設定</h4>
                <label className="row">
                    <div className="title">素材</div>
                    <div className="field noBorder">
                        <Switch
                            defaultChecked={formStorageData.handleMaterial}
                            onChange={(checked, event) => handleChange(checked, event, 'handleMaterial')}
                        />
                    </div>
                </label>
                <label className="row">
                    <div className="title">訂單</div>
                    <div className="field noBorder">
                        <Switch
                            defaultChecked={formStorageData.handleFinance}
                            onChange={(checked, event) => handleChange(checked, event, 'handleFinance')}
                        />
                    </div>
                </label>
                <label className="row">
                    <div className="title">帳號管理</div>
                    <div className="field noBorder">
                        <Switch
                            defaultChecked={formStorageData.isMax}
                            onChange={(checked, event) => handleChange(checked, event, 'isMax')}
                        />
                    </div>
                </label>
            </AuthorityWrap>

            <div className="row row-btns">
                <Buttons
                    text="送出"
                    htmlType="submit"
                />
                <Buttons
                    text="取消"
                    type="default"
                    onClick={hideModal}
                />
            </div>
        </form>

    );

};

export default AdAccountForm;
