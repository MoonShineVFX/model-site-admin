import util from './util';

const Service = {
    // 登入
    login: ({ reqData, headers }) => util.serviceProxy('/login', reqData, {
        headers: { ...headers },
    }),

    // 重設密碼
    resetPassword: ({ reqData, headers }) => util.serviceProxy('/???', reqData, {
        headers: { ...headers },
    }),

    // common
    common: (reqData) => util.serviceProxy('/admin_common', reqData),

    // 商品
    productSearch: (reqData) => util.serviceProxy('/admin_product_search', reqData),
    productActive: (reqData) => util.serviceProxy('/admin_product_active', reqData),
    productCreate: (reqData) => util.serviceProxy('/admin_product_create', reqData),
    productUpdate: (reqData) => util.serviceProxy('/admin_product_update', reqData),

    // 上傳檔案 (圖片 > 編輯器用)
    imageUpload: (reqData) => util.serviceProxy('/admin_image_upload', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 標籤管理
    tagCreate: (reqData) => util.serviceProxy('/tag_create', reqData),
    tagUpdate: (reqData) => util.serviceProxy('/tag_update', reqData),
    tagDelete: (reqData) => util.serviceProxy('/tag_delete', reqData),

    // 訂單
    orderSearch: (reqData) => util.serviceProxy('/admin_order_search', reqData),

    // 後台帳號
    adAccountSearch: (reqData) => util.serviceProxy('/???', reqData),

};

export default Service;
