module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: '8080',
        https: false,
        proxy: 'http://localhost:3030'
    }
};
