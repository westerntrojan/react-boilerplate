module.exports = () => ({
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
});
