const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.js'),

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].[hash].js',
	},

	devServer: {
		port: 3000,
		compress: true,
		historyApiFallback: false,
		inline: true,
		progress: true,
		publicPath: '/',
		hot: true,
	},

	devtool: 'source-map',

	optimization: {
		moduleIds: 'hashed',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
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
			filename: isDev ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
		}),
		new Dotenv(),
		new HardSourceWebpackPlugin(),
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
				use: [
					{
						loader: 'thread-loader',
					},
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true,
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							ident: 'postcss',
							plugins: () => [
								require('postcss-flexbugs-fixes')(),
								require('postcss-preset-env')({
									stage: 3,
								}),
							],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true,
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							ident: 'postcss',
							plugins: () => [
								require('postcss-flexbugs-fixes')(),
								require('postcss-preset-env')({
									stage: 3,
								}),
							],
						},
					},
				],
			},
		],
	},
};
