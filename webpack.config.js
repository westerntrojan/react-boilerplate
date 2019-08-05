const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.js'),

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},

	devServer: {
		port: 3000,
		compress: true,
		historyApiFallback: true,
		inline: true,
		progress: true,
		clientLogLevel: 'none',
		contentBase: path.resolve(__dirname, 'src'),
		watchContentBase: true,
		publicPath: '/',
		hot: true,
		quiet: true,
	},

	devtool: 'source-map',

	optimization: {
		minimizer: [
			new TerserJSPlugin({
				cache: true,
				parallel: true,
			}),
			new OptimizeCSSAssetsPlugin({}),
			new UglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					output: {
						comments: false,
					},
				},
			}),
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			hash: true,
			filename: 'index.html',
			template: path.join(__dirname, 'public', 'index.html'),
			minify: {
				collapseWhitespace: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
		new Dotenv(),
		// new BundleAnalyzerPlugin()
	],

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},

			{
				test: /\.scss$/,
				use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},

			{
				test: /\.css$/,
				use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
};
