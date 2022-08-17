import util from './util';

const Service = {
    // 登入
    login: ({ reqData, headers }) => util.serviceProxy('/admin_login', reqData, {
        headers: { ...headers },
    }),

    // common
    common: (reqData) => util.serviceProxy('/admin_common', reqData),
    setLang: (reqData) => util.serviceProxy('/set_language', reqData),

    // 商品
    productSearch: (reqData) => util.serviceProxy('/admin_product_search', reqData),
    productActive: (reqData) => util.serviceProxy('/admin_product_active', reqData),
    productCreate: (reqData) => util.serviceProxy('/admin_product_create', reqData),
    productUpdate: (reqData) => util.serviceProxy('/admin_product_update', reqData),
    productDeftag: (reqData) => util.serviceProxy('/product_xltn', reqData),

    // 上傳檔案 (單張圖片)
    imageUpload: (reqData) => util.serviceProxy('/admin_image_upload', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    // 上傳檔案 (多張圖片)
    imagePreviewUpload: (reqData) => util.serviceProxy('/admin_preview_images_upload', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    imageDelete: (reqData) => util.serviceProxy('/admin_image_delete', reqData),

    // 上傳模型
    modelList: (reqData) => util.serviceProxy({
        method: 'get',
        url: `/admin_products/${reqData}/models`,
    }),
    modelUploadUri: (reqData) => util.serviceProxy('/admin_model_upload_uri', reqData),

    // 標籤管理
    tagCreate: (reqData) => util.serviceProxy('/admin_tag_create', reqData),
    tagUpdate: (reqData) => util.serviceProxy('/admin_tag_update', reqData),

    // 訂單
    orderSearch: (reqData) => util.serviceProxy('/admin_order_search', reqData),
    orderExport: (reqData) => util.serviceProxy({
        method: 'get',
        url: `/admin_order_export?${reqData}`,
        responseType: 'blob',
    }),

    // 發票
    paperInvoiceUpdate: (reqData) => util.serviceProxy('/admin_order_paper_invoice_update', reqData),

    // Banner
    bannerActive: (reqData) => util.serviceProxy('/admin_banner_active', reqData),
    bannerCreate: (reqData) => util.serviceProxy('/admin_banner_create', reqData),
    bannerUpdate: (reqData) => util.serviceProxy('/admin_banner_update', reqData),
    bannerDeftag: (reqData) => util.serviceProxy('/banner_xltn', reqData),

    // 文件導覽
    tutorialActive: (reqData) => util.serviceProxy('/admin_tutorial_active', reqData),
    tutorialCreate: (reqData) => util.serviceProxy('/admin_tutorial_create', reqData),
    tutorialUpdate: (reqData) => util.serviceProxy('/admin_tutorial_update', reqData),
    tutorialDeftag: (reqData) => util.serviceProxy('/tutorial_xltn', reqData),

    // 關於我們
    aboutUsUpdate: (reqData) => util.serviceProxy('/admin_about_update', reqData),
    aboutUsDeftag: (reqData) => util.serviceProxy('/about_xltn', reqData),

    // 隱私權政策
    privacyUpdate: (reqData) => util.serviceProxy('/admin_privacy_update', reqData),

    // 後台帳號
    adAccountSearch: (reqData) => util.serviceProxy('/admin_account_search', reqData),
    adAccountCreate: (reqData) => util.serviceProxy('/admin_account_create', reqData),
    adAccountUpdate: (reqData) => util.serviceProxy('/admin_account_update', reqData),

    // 重設密碼
    resetPassword: (reqData) => util.serviceProxy('/admin_change_password', reqData),

    // 詞條管理
    deftagSearch: (reqData) => util.serviceProxy('/admin_lang_config_search', reqData),
    deftagUpdate: (reqData) => util.serviceProxy('/admin_lang_config_update', reqData),
};

export default Service;
