/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    webpack: (config, { isServer }) => {
        // ...
        if (!isServer) {
            config.resolve.fallback = {
                // ...
                child_process: false,
            };
        }
        // ...
        return config;
    },
};

