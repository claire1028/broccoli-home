const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const pkg = require('./package.json');
const port = pkg.dev.port || 9000;

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        disableHostCheck: true,
        contentBase: './dist',
        port,
		host: '0.0.0.0',
		hot: false,
		inline: true,
		open: true,
		useLocalIp: true,
		proxy: {
			'/prod': {
                target: pkg.dev.api,
                changeOrigin: true
            }
		},

    }
});