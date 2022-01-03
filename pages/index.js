import ProductBase from '../src/components/product/ProductBase';
import { ProductProvider } from '../src/context/product/product.state';
import util from '../src/utils/util';

const Home = ({ pageData }) => (

    <ProductProvider>
        <ProductBase pageData={pageData} />
    </ProductProvider>

);

export default Home;

export async function getServerSideProps ({ req }) {

    // 沒有 cookie(token) 導登入頁
    // if (!req.cookies.token) {

    //     return {
    //         redirect: {
    //             destination: '/login',
    //             permanent: false,
    //         },
    //     };

    // }

    // const resData = await util.serviceServer({
    //     url: '/products',
    //     cookie: req.cookies.token,
    // });

    // const { data } = resData;

    const resData = await fetch('http://localhost:1007/admin/json/products.json');
    const data = await resData.json();

    // console.log('data:', data)

    return {
        props: {
            pageData: {
                title: '模型管理',
                imageSize: '321x186',
                data: data.data,
            },
        },
    };

}
