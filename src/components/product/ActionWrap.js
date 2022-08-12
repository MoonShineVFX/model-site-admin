import { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import ButtonsLang from '../../components/ButtonsLang';
import DeftagDataForm from '../../components/DeftagDataForm';

import { DetailWrapLayout } from './ProductLayout';
import ProductForm from './ProductForm';
import PositionImageUpload from './PositionImageUpload';
import PreviewImageUpload from './PreviewImageUpload';

import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';

const ActionWrap = ({ title, data, service }) => {

    // Context
    const { isShow, deftag } = useContext(GlobalContext);

    return (

        <Fragment>
            <HeadTag title={title} />

            <ContentHeader title="編輯商品">
                {
                    (service === 'productUpdate') &&
                        <ButtonsLang id={data.id} />
                }
            </ContentHeader>

            <DetailWrapLayout gutter={60}>
                <Col span={14}>
                    <ProductForm
                        data={data}
                        service={service}
                    />
                </Col>

                {
                    // 需先建立一筆商品後，才能上傳圖片區塊與模型組圖
                    (service === 'productUpdate') &&
                        <Col span={10} className="right">
                            <PositionImageUpload data={data} />
                        </Col>
                }
            </DetailWrapLayout>

            {
                // 需先建立一筆 demo place 後，才能上傳圖片輪播與與文件
                (service === 'productUpdate') && <PreviewImageUpload data={data} />
            }

            {
                    // 語系表單
                isShow &&
                    <DeftagDataForm
                        handleFetchData={() => Service.productDeftag({ id: deftag.id })}
                        handleUpdateData={Service.productUpdate}
                    />
            }
        </Fragment>

    );

};

ActionWrap.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    service: PropTypes.string.isRequired,
};

export default ActionWrap;
