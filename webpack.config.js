const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const config = [{
	site: 'index'
  }, {
	site: 'details'
  }];
  
module.exports = {
	entry: {
		index: './src/index.js',
		details: './src/details.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './build')
	},
	devServer: {
		open: true
	},
	module: {
		
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.s[ac]ss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
					'postcss-loader'
				]
			},       
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'workshop',
			template: './src/index.html',
			
		}),
			new HtmlWebpackPlugin({
			  filename: 'details.html',
			  template: 'src/details.html',
			})
		  
	]
	

}