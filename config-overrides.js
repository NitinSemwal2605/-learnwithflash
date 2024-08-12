// config-overrides.js
module.exports = {
    webpack: function (config, env) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            crypto: require.resolve('crypto-browserify'),
        };
        return config;
    },
};
