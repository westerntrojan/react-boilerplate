const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const paths = require('./paths');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: paths.src + '/index.tsx',

	output: {
		path: paths.build,
		filename: '[name].js',
	},

	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			hash: true,
			filename: 'index.html',
			template: paths.static + '/index.html',
			minify: {
				collapseWhitespace: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: isDev ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
		}),
		new HardSourceWebpackPlugin({
			cacheDirectory: '/node_modules/.cache/hard-source/[confighash]',
		}),
		new Dotenv(),
		new CleanWebpackPlugin(),
		new CopyPlugin([
			{
				from: paths.static + '/assets',
				to: 'assets',
				ignore: ['*.DS_Store'],
			},
		]),
	],

	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},

	module: {
		rules: [
			{
				test: /\.js(x?)$/,
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
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
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
						options: {sourceMap: true},
					},
					{
						loader: 'postcss-loader',
						options: {sourceMap: true},
					},
					{
						loader: 'sass-loader',
						options: {sourceMap: true},
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
						options: {sourceMap: true},
					},
					{
						loader: 'postcss-loader',
						options: {sourceMap: true},
					},
				],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
					context: 'src', // prevent display of src/ in filename
				},
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|)$/,
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: '[path][name].[ext]',
					context: 'src', // prevent display of src/ in filename
				},
			},
		],
	},
};
