import { Fragment, createRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

// import HeadSEO from '../src/containers/HeadSEO';
// import LinkText from '../src/components/LinkText';

const Login = () => {

    // Ref
    const ref = createRef();

    //
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: 'aaa123',
        },
    });

    // Submit
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            'g-recaptcha-response': ref.current.getValue(),
        };

        axios({
            method: 'POST',
            url: 'https://fullbodyscan.msvfx.com/api/recaptcha_test',
            data: {
                'g-recaptcha-response': ref.current.getValue(),
            },
            withCredentials: true,
        })
        .then((res) => {

            console.log('res:', res)

        })
        .catch( (error) => console.log(error));

    };

    return (

        <Fragment>
            {/* <HeadSEO title="登入" /> */}

            <form onSubmit={handleSubmit(handleReqData)}>
                {/* <div>
                    <label htmlFor="name">請輸入名字:</label>
                    <input
                        type="text"
                        name="name"
                        {...register('name')}
                    />
                </div> */}

                {/* <Button
                    type="submit"
                    variant="contained"
                >
                    送出
                </Button> */}
            </form>

            {/* <LinkText /> */}
        </Fragment>

    );

};

export default Login;

/**
 * google recaptcha
 * https://www.youtube.com/watch?v=vrbyaOoZ-4Q
 */
