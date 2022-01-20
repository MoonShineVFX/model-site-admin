import TagBase from '../../src/components/tag/TagBase';
import { TagProvider } from '../../src/context/tag/tag.state';
import util from '../../src/utils/util';

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

    const resData = await util.serviceServer({
        url: '/admin_tags',
        cookie: req.cookies.token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '標籤管理',
                data: data.data,
            },
        },
    };

}
