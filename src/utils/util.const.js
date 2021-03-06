import dayjs from 'dayjs';

const utilConst = {
    today: dayjs().format('YYYY-MM-DD'),
    sendSuccessText: '資料已成功送出。',
    emptyText: '目前沒有資料...',
    limitSizeText: '檔案不得超過 1MB，請重新選擇!!!',
    supportFormat: '.jpg,.jpeg,.png',
    // 側邊攔
    navbar: [
        {
            name: '商品管理',
            pageKey: '',
            subItems: [],
        },
        {
            name: '訂單管理',
            pageKey: 'order',
            subItems: [],
        },
        {
            name: '會員列表',
            pageKey: 'member',
            subItems: [],
        },
        {
            name: '前台設定',
            pageKey: 'web',
            subItems: [
                {
                    name: '行銷廣告',
                    pageKey: 'banner',
                },
                {
                    name: '文件導覽',
                    pageKey: 'toturial',
                },
                {
                    name: '關於我們',
                    pageKey: 'about_us',
                },
            ],
        },
        {
            name: '其他設定',
            pageKey: 'setting',
            subItems: [
                {
                    name: '標籤',
                    pageKey: 'tag',
                },
                {
                    name: '隱私權政策',
                    pageKey: 'privacy',
                },
                {
                    name: '後台帳號',
                    pageKey: 'admin_account',
                },
            ],
        },
        {
            name: '詞條管理',
            pageKey: 'deftag',
            subItems: [],
        },
    ],
    lightboxTitle: {
        createTag: '新增標籤',
        updateTag: '編輯標籤',
        createAdAccount: '新增後台帳號',
        updateAdAccount: '編輯後台帳號',
        createTutorial: '新增文件導覽',
        updateTutorial: '編輯文件導覽',
        createBanner: '新增 Banner',
        updateBanner: '編輯 Banner',
        updateLang: '更新語言',
    },
    // Error mesg
    errorMesg: {
        error_required: '此欄位為必填',
        error_pattern: '格式有誤',
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
    activeStatus: {
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
        VACC: 'ATM 轉帳',
        CREDIT: '信用卡',
    },
    langs: {
        'zh': '繁體中文',
        'en': 'English',
        // 'cn': '简体中文',
        // 'jp': '日文',
    },
    invoiceTypeText: {
        paper: '紙本',
        electronic: '電子發票',
    },
    paperInvoiceTypeText: {
        duplicate: '二聯式',
        triplicate: '三聯式',
    },
};

export default utilConst;
