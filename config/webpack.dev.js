const merge = require('webpack-merge');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',

	output: {
		path: paths.build,
		filename: '[name].js',
	},

	devtool: 'source-map',

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
