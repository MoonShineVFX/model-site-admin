import dayjs from 'dayjs';

const utilConst = {
    today: dayjs().format('YYYY-MM-DD'),
    sendSuccessText: '資料已成功送出，將於 3 秒後更新。',
    emptyText: '目前沒有資料...',
    errorText: '此欄位為必填!',
    limitSizeText: '檔案不得超過 2MB，請重新選擇!!!',
    supportFormat: '.jpg,.jpeg,.png',

    // 側邊攔
    navbar: [
        {
            name: '商品管理',
            pageKey: '',
            group: 'product',
        },
        {
            name: '標籤管理',
            pageKey: 'tag',
            group: 'product',
        },
        {
            name: '訂單管理',
            pageKey: 'order',
            group: 'order',
        },
        {
            name: '後台帳號設定',
            pageKey: 'admin_account',
            group: 'setting',
        },
        {
            name: '關於我們',
            pageKey: 'about_us',
            group: 'setting',
        },
    ],

    lightboxTitle: {
        createTag: '新增標籤',
        updateTag: '編輯標籤',
        createAdAccount: '新增後台帳號',
        updateAdAccount: '編輯後台帳號',
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
        true: '上架',
        false: '下架',
    },

    orderStatus: {
        unpaid: '等待付款',
        success: '交易成功',
        fail: '交易失敗',
        cancel: '取消交易',
    },

    payment: {
        webATM: '網路 ATM',
        credit: '信用卡',
    },

};

export default utilConst;
