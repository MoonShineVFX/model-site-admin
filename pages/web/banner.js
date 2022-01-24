import BannerBase from '../../src/components/setting/BannerBase';
import { BannerProvider } from '../../src/context/setting/banner.state';
import util from '../../src/utils/util';

const Banner = ({ pageData }) => (

    <BannerProvider>
        <BannerBase pageData={pageData} />
    </BannerProvider>

);

export default Banner;

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
        url: '/admin_banners',
        cookie: req.cookies.token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '行銷廣告',
                imageSize: '840x386',
                data: data.data,
            },
        },
    };

}