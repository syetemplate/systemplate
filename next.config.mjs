/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/app',
                permanent: true,
            },
            {
                source: '/app',
                destination: '/app/websites',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
