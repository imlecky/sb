const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'src', 'index.js'),
	mode: 'production',
	output: {
		path: path.join(__dirname, './build'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.m?js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/preset-react'
					],
					"plugins": [
						["@babel/plugin-proposal-class-properties"]
					]
				}
			}
		},
		{
			test: /.scss$/,
			use: [
				{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader',
					options: {
						modules: true,
						camelCase: 'dashes',
						localIdentName: '[path][name]__[local]'
					}
				},
				{
					loader: 'sass-loader'
				}
			]
		},
		{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		},
		{
			test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
			use: {
				loader: 'file-loader',
				options: {},
			},
		}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html')
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 9000
	}
}