const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			styles: {
	// 				name: 'style',
	// 				test: /\.css$/,
	// 				chunks: 'all',
	// 				enforce: true
	// 			}
	// 		}
	// 	}
	// },
	entry: {
		main: path.resolve(__dirname, 'src/js/app.js'),
		contacto: path.resolve(__dirname, 'src/js/contacto.js')
		// main: [ path.resolve(__dirname, 'src/js/app.js'), path.resolve(__dirname, 'src/style/style.css') ],
		// contacto: [ path.resolve(__dirname, 'src/js/contacto.js'), path.resolve(__dirname, 'src/style/style.css') ]
	},
	output: {
		filename: 'js/[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	// devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
		host: 'localhost'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [ 'babel-loader' ]
			},
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							autoprefixer: {
								browser: [ 'last 2 versions' ]
							},
							sourceMap: true,
							plugins: () => [ autoprefixer ]
						}
					},
					'resolve-url-loader',
					'sass-loader?outputStyle=compressed&sourceMap'
				]
			},
			{
				test: /\.(html)$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg|webp)$/i,
				use: [ 'file-loader?name=assets/image/[name].[ext]', 'image-webpack-loader?bypassOnDebug' ]
			},
			{
				test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
				use: 'file-loader?name=assets/[name].[ext]'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: './css/[name].[hash].bundle.css',
			chunkFilename: 'css/[name].[hash].css'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
			chunks: [ 'main' ]
		}),
		new HtmlWebpackPlugin({
			filename: 'contacto.html',
			template: 'src/contacto.html',
			chunks: [ 'contacto' ],

			files: {
				css: [ 'main.css' ],
				chunks: {
					head: {
						entry: 'assets/head_bundle.js',
						css: [ 'main.css' ]
					},
					main: {
						entry: 'assets/main_bundle.js',
						css: []
					}
				}
			}
		})
	]
};
