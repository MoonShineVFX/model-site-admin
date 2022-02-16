import TutorialBase from '../../src/components/setting/TutorialBase';
import { TutorialProvider } from '../../src/context/setting/tutorial.state';
import util from '../../src/utils/util';

const Tutorial = ({ pageData }) => (

    <TutorialProvider>
        <TutorialBase pageData={pageData} />
    </TutorialProvider>

);

export default Tutorial;

export async function getServerSideProps ({ req }) {

    // 沒有 cookie(admin_token) 導登入頁
    if (!req.cookies.admin_token) {

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    }

    const resData = await util.serviceServer({
        url: '/admin_tutorials',
        cookie: req.cookies.admin_token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '文件導覽',
                imageSize: '273x161',
                data: data.data,
            },
        },
    };

}
