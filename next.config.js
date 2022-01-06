module.exports = {
    env: {
        HOST: process.env.NEXT_PUBLIC_HOST || 'market.moonshine.tw',
    },
    basePath: '/admin',
    // async headers() {
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: [
    //                 {
    //                     key: 'Strict-Transport-Security',
    //                     value: 'max-age=63072000',
    //                 }
    //             ],
    //         },
    //     ]
    // },
    async redirects () {
        return [
            {
                source: '/index',
                destination: '/',
                permanent: false,
            },
        ]
    },
}
