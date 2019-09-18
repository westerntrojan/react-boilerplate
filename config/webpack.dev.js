const merge = require('webpack-merge');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',

	devtool: 'inline-source-map',

	devServer: {
		port: 3000,
		compress: true,
		historyApiFallback: false,
		inline: true,
		progress: true,
		publicPath: '/',
		clientLogLevel: 'error',
		hot: true,
	},

	plugins: [
		// new BundleAnalyzerPlugin()
	],
});
