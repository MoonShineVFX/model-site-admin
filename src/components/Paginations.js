import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import styled from 'styled-components';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FontIcon from './FontIcon';
import Buttons from './Buttons';

const PaginationLayout = styled(Pagination)({
    '.ant-pagination': {
        marginTop: '20px',
    },
});

const nextPrevButtons = (type) => (

    <Buttons>
        {type === 'prev' && <FontIcon icon={faChevronLeft} />}
        <span>{`${type === 'prev' ? '上' : '下'}一頁`}</span>
        {type === 'prev' && <FontIcon icon={faChevronRight} />}
    </Buttons>

);

const itemRender = (page, type, originalElem) => {

    if (type === 'prev') return nextPrevButtons('prev');
    if (type === 'next') return nextPrevButtons('next');

    // Betty: 是否能簡化 fn!?

    return originalElem;

};

const showTotal = (total, range) => (`共 ${total} 筆資料，顯示第 ${range[0]}-${range[1]} 筆`);

const Paginations = ({
    total,
    pageSize,
    showPageRange,
}) => (

    <PaginationLayout
        className="pagination"
        total={total}
        pageSize={pageSize}
        itemRender={itemRender}
        showTotal={showPageRange && showTotal}
    />

);

Paginations.defaultProps = {
    pageSize: 50,
    showPageRange: true,
};

Paginations.propTypes = {
    total: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    showPageRange: PropTypes.bool,
};

export {
    Paginations as default,
    itemRender,
    showTotal,
};
