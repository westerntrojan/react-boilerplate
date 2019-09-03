const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const merge = require('webpack-merge');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devServer = require('./webpack/devServer');
const typescript = require('./webpack/typescript');

const isDev = process.env.NODE_ENV !== 'production';
var APP_DIR = path.join(__dirname, 'src');
var BUILD_DIR = path.join(__dirname, 'build');

const common = merge([
	{
		entry: path.join(APP_DIR, 'index.tsx'),

		output: {
			path: path.join(BUILD_DIR),
			filename: '[name].[hash].js',
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
					terserOptions: {
						parse: {
							ecma: 8,
						},
						compress: {
							ecma: 5,
							warnings: false,
							comparisons: false,
							inline: 2,
						},
						mangle: {
							safari10: true,
						},
						output: {
							ecma: 5,
							comments: false,
							ascii_only: true,
						},
					},
					cache: true,
					parallel: true,
				}),
				new OptimizeCSSAssetsPlugin({}),
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
			new HardSourceWebpackPlugin({
				cacheDirectory: '/node_modules/.cache/hard-source/[confighash]',
			}),
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
	},

	devServer(),
	typescript(),
]);

module.exports = () => merge([common]);
