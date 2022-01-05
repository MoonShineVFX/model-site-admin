import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';

import { DetailWrapLayout } from './ProductLayout';
import ImageUpload from './ImageUpload';
import ProductForm from './ProductForm';
// import PlaceOtherForm from './PlaceOtherForm';

const ActionWrap = ({ title, data, serviceKey }) => {

    // console.log('ActionWrap data:', data)

    return (

        <Fragment>
            <HeadTag title={title} />

            <ContentHeader
                title={title}
                showButton={false}
            />

            <DetailWrapLayout gutter={60}>
                <Col span={14}>
                    <ProductForm
                        data={data}
                        serviceKey={serviceKey}
                    />
                </Col>

                {
                    // 需先建立一筆商品後，才能上傳圖片區塊與模型組圖
                    (serviceKey === 'productUpdate') &&
                        <Col span={10} className="right">
                            <ImageUpload data={data} />
                        </Col>
                }
            </DetailWrapLayout>

            {
                // 需先建立一筆 demo place 後，才能上傳圖片輪播與與文件
                // (serviceKey === 'demoPlaceUpdate') && <PlaceOtherForm data={data} />
            }
        </Fragment>

    );

};

ActionWrap.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    serviceKey: PropTypes.string.isRequired,
};

export default ActionWrap;
