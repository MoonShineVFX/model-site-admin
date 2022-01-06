import TagBase from '../src/components/tag/TagBase';
import { TagProvider } from '../src/context/tag/tag.state';
import util from '../src/utils/util';

//
const TagList = ({ pageData }) => (

    <TagProvider>
        <TagBase pageData={pageData} />
    </TagProvider>

);

export default TagList;

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

    // const resData = await util.serviceServer({
    //     url: '/admin_orders',
    //     cookie: req.cookies.token,
    // });

    // const { data } = resData;

    const resData = await fetch('http://localhost:1007/admin/json/tag.json');
    const data = await resData.json();

    return {
        props: {
            pageData: {
                title: '標籤管理',
                data: data.data,
            },
        },
    };

}
