module.exports = {
    env: {
        HOST: process.env.NEXT_PUBLIC_HOST || 'market.moonshine.tw',
    },
    basePath: '/admin',
    async redirects () {
        return [
            {
                source: '/index',
                destination: '/',
                permanent: false,
            },
            // {
            //     source: '/admin/:slug*',
            //     has: [
            //         {
            //             type: 'cookie',
            //             key: 'authorized',
            //             value: 'false',
            //         },
            //     ],
            //     destination: '/login',
            //     permanent: false,
            // },
        ]
    },
}
