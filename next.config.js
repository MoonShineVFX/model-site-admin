module.exports = {
    env: {
        HOST: 'backend-52mayiffyq-de.a.run.app',
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
