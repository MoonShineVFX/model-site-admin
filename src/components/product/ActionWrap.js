import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';

import { DetailWrapLayout } from './ProductLayout';
import ProductForm from './ProductForm';
import PositionImageUpload from './PositionImageUpload';
import PreviewImageUpload from './PreviewImageUpload';

const ActionWrap = ({ title, data, service }) => (

    <Fragment>
        <HeadTag title={title} />
        <ContentHeader title={title} />
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
    </Fragment>

);

ActionWrap.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    service: PropTypes.string.isRequired,
};

export default ActionWrap;
