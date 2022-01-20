import AdAccountBase from '../../src/components/admin/AdAccountBase';
import { AdAccountProvider } from '../../src/context/admin/adaccount.state';
import util from '../../src/utils/util';

const AdminAccount = ({ pageData }) => (

    <AdAccountProvider>
        <AdAccountBase pageData={pageData} />
    </AdAccountProvider>

);

export default AdminAccount;

export async function getServerSideProps ({ req }) {

    // 沒有 cookie(token) 導登入頁
    if (!req.cookies.token) {

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    }

    const resData = await util.serviceServer({
        url: '/admin_accounts',
        cookie: req.cookies.token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '後台帳號設定',
                data: data.data,
            },
        },
    };

}
