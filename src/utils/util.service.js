import util from './util';

const Service = {
    // 登入
    login: ({ reqData, headers }) => util.serviceProxy('/login', reqData, {
        headers: { ...headers },
    }),

    // common
    common: (reqData) => util.serviceProxy('/common.json', reqData),

    // 商品
    productActive: (reqData) => util.serviceProxy('/admin_product_active', reqData),
    productCreate: (reqData) => util.serviceProxy('/???_create', reqData),
    productUpdate: (reqData) => util.serviceProxy('/???_update', reqData),

    bannerCreate: (reqData) => util.serviceProxy('/banner_create', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    bannerUpdate: (reqData) => util.serviceProxy('/banner_update', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    bannerDelete: (reqData) => util.serviceProxy('/banner_delete', reqData),

    // 標籤管理
    tagCreate: (reqData) => util.serviceProxy('/tag_create', reqData),
    tagUpdate: (reqData) => util.serviceProxy('/tag_update', reqData),
    tagDelete: (reqData) => util.serviceProxy('/tag_delete', reqData),

    // 上傳檔案 (圖片 > 編輯器用)
    imageUpload: (reqData) => util.serviceProxy('/image_upload', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 訂單
    orderSearch: (reqData) => util.serviceProxy('/admin_order_search', reqData),
};

export default Service;
