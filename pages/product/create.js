import { useContext, useEffect } from 'react';
import ActionWrap from '../../src/components/product/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';

const ProductCreate = () => {

    // Context
    const { globalDispatch, formStorageDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'page', payload: '' });
        formStorageDispatch({ type: 'CLEAR' });

    }, [globalDispatch, formStorageDispatch]);

    return (

        <ActionWrap
            title="新增商品"
            serviceKey="productCreate"
        />

    );

};

export default ProductCreate;
