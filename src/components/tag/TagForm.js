import { Fragment, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { CloseCircleOutlined } from '@ant-design/icons';

import Buttons from '../Buttons';
import { FormRow } from '../LightboxForm';
import { ActionLayout, CreateFieldLayout } from './TagLayout';
import { GlobalContext } from '../../context/global.state';
import { TagContext } from '../../context/tag/tag.state';
import utilConst from '../../utils/util.const';

const { errorMesg } = utilConst;

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

        if (currEvent === 'updateTag') {

            // 結構
            reqData = [...reqData.tags][0];
            tagUpdate(reqData);

        }
        else tagCreate(reqData);
        targetReset();

    };

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            <CreateFieldLayout>
                <span onClick={targetAppend}>增加欄位</span>
            </CreateFieldLayout>

            {(currEvent === 'updateTag') && <p>id: {formStorageData.id}</p>}

            {
                fields.map((item, idx) => (

                    <Fragment key={item.id}>
                        <div className="items">
                            <FormRow
                                className={errors?.tags?.[idx]?.name ? 'hasError' : ''}
                                labelTitle="標籤名稱"
                                name={`tags.${idx}.name`}
                                required
                                errors={errors}
                            >
                                <input
                                    type="text"
                                    name={`tags.${idx}.name`}
                                    defaultValue={item.name}
                                    {...register(`tags.${idx}.name`, {
                                        required: {
                                            value: true,
                                            message: errorMesg.error_required,
                                        },
                                    })}
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
