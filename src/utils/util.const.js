import dayjs from 'dayjs';

const utilConst = {
    today: dayjs().format('YYYY-MM-DD'),
    sendSuccessText: '資料已成功送出，將於 3 秒後更新。',
    emptyText: '目前沒有資料...',
    errorText: '此欄位為必填!',

    // 側邊攔
    navbar: [
        {
            name: '模型管理',
            pageKey: '',
        },
        {
            name: '標籤管理',
            pageKey: 'tags',
        },
        {
            name: '訂單管理',
            pageKey: 'orders',
        },
        {
            name: '帳號管理',
            pageKey: 'admin_account',
        },
    ],

    lightboxTitle: {
        createBanner: '新增 Banner',
        updateBanner: '編輯 Banner',
        createTag: '新增標籤',
        updateTag: '編輯標籤',
        createPartner: '新增夥伴',
        updatePartner: '編輯夥伴',
        createPolicy: '新增政策資源',
        updatePolicy: '編輯政策資源',
        settingTag: '設定標籤',
    },

    // Prompt type
    prompts: {
        info: '提示',
        warning: '警告',
        error: '錯誤',
        success: '成功',
    },

    // Yes or No
    yesOrNo: {
        'false': '否',
        'true': '是',
    },

    productActiveStatus: {
        active: '上架',
        inactive: '下架',
    },
};

export default utilConst;
