import util from './util';

const Service = {
    // 登入
    login: ({ reqData, headers }) => util.serviceProxy('/login', reqData, {
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
    imageDelete: (reqData) => util.serviceProxy('/admin_image_delete', reqData),

    // 標籤管理
    tagCreate: (reqData) => util.serviceProxy('/admin_tag_create', reqData),
    tagUpdate: (reqData) => util.serviceProxy('/admin_tag_update', reqData),

    // 訂單
    orderSearch: (reqData) => util.serviceProxy('/admin_order_search', reqData),

    // Banner
    bannerCreate: (reqData) => util.serviceProxy('/admin_banner_create', reqData),
    bannerUpdate: (reqData) => util.serviceProxy('/admin_banner_update', reqData),

    // 文件導覽
    tutorialCreate: (reqData) => util.serviceProxy('/admin_tutorial_create', reqData),
    tutorialUpdate: (reqData) => util.serviceProxy('/admin_tutorial_update', reqData),

    // 關於我們
    aboutUsUpdate: (reqData) => util.serviceProxy('/admin_about_update', reqData),

    // 後台帳號
    adAccountSearch: (reqData) => util.serviceProxy('/admin_account_search', reqData),
    adAccountCreate: (reqData) => util.serviceProxy('/admin_account_create', reqData),
    adAccountUpdate: (reqData) => util.serviceProxy('/admin_account_update', reqData),

    // 重設密碼
    resetPassword: (reqData) => util.serviceProxy('/admin_change_password', reqData),
};

export default Service;
