import util from './util';

const Service = {
    // login
    login: ({ reqData, headers }) => util.serviceProxy('/get_token', reqData, {
        headers: { ...headers },
    }),

    // common
    common: (reqData) => util.serviceProxy('/common.json', reqData),

    // Banner
    productActive: (reqData) => util.serviceProxy('/???', reqData),
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
};

export default Service;
