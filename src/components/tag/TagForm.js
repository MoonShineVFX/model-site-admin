import { Fragment, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { CloseCircleOutlined } from '@ant-design/icons';

import Buttons from '../Buttons';
import { FormRow } from '../LightboxForm';
import { ActionLayout, CreateFieldLayout } from './TagLayout';
import { GlobalContext } from '../../context/global.state';
import { TagContext } from '../../context/tag/tag.state';

const TagForm = () => {

    // Context
    const {
        currEvent,
        formStorageDispatch,
        lightboxDispatch,
        formStorageData,
    } = useContext(GlobalContext);

    const {
        tagCreate,
        tagUpdate,
    } = useContext(TagContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { errors },
        clearErrors,
    } = useForm({
        defaultValues: {
            tags: formStorageData ? [{ ...formStorageData }] : [{ name: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: 'tags' });

    // 隱藏 Modal
    const hideModal = () => {

        formStorageDispatch({ type: 'CLEAR' });
        lightboxDispatch({ type: 'HIDE' });

    };

    // remove (畫面上的 remove)
    const targetRemove = (index) => remove(index);

    // append
    const targetAppend = () => {

        clearErrors('tags');
        append({ name: '' });

    };

    // reset
    const targetReset = () => reset({ tags: [{ name: '' }] });

    // 送資料
    const handleReqData = (reqData) => {

        // 結構
        if (currEvent === 'updateTag') reqData = [...reqData.tags][0];
        else reqData = reqData.tags;

        // Service
        if (currEvent === 'updateTag') tagUpdate(reqData);
        else tagCreate(reqData);
        targetReset();

    };

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            <CreateFieldLayout onClick={targetAppend}>
                增加欄位
            </CreateFieldLayout>

            {(currEvent === 'updateTag') && <p>id: {formStorageData.id}</p>}

            {
                fields.map((item, idx) => (

                    <Fragment key={item.id}>
                        <div className="items">
                            <FormRow
                                labelTitle="標籤名稱"
                                required={true}
                                error={(errors?.tags?.length && errors.tags[idx].name) && true}
                            >
                                <input
                                    type="text"
                                    name="name"
                                    control={control}
                                    defaultValue={item.name}
                                    {...register(`tags.${idx}.name`, { required: true })}
                                />
                            </FormRow>

                            <ActionLayout>
                                <CloseCircleOutlined
                                    className={!idx && 'hide'}
                                    onClick={() => targetRemove(idx)}
                                />
                            </ActionLayout>
                        </div>
                    </Fragment>

                ))
            }

            <div className="row row-btns">
                <Buttons
                    text="送出"
                    htmlType="submit"
                />

                {
                    (currEvent === 'updateTag') ? (

                        <Buttons
                            text="取消"
                            type="default"
                            onClick={hideModal}
                        />

                    ) : (

                        <Buttons
                            text="清除"
                            type="default"
                            onClick={targetReset}
                        />

                    )
                }
            </div>
        </form>

    );

};

export default TagForm;
