const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 3000,
    open: 'brave-browser'
  },
	entry: {
		main: path.resolve(__dirname, './src/index.js'),
	},
	mode: 'development',
	module: {
	  rules: [
	    {
	      test: /\.css$/,
	      use: ['style-loader', 'css-loader']
	    }
	  ]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
	},
	plugins: [
    	new HtmlWebpackPlugin({
	    	title: 'pixi-matter-webpack',
	    	template: path.resolve(__dirname, './src/template.html'), // template file
	    	filename: 'index.html', // output file
			}),
			new CleanWebpackPlugin(),
			new CopyPlugin({
	      patterns: [
	        { from: "src/game/asset", to: "asset" },
	      ],
	    }),
	],
};