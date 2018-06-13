const path = require('path');

module.exports = {
    entry:  {
        index: './src/index.js',
        about: './src/about.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
             {
	         test: /\.txt$/,
                 use: 'raw-loader'
             },
	     {
                 test: /\.js$/,
                 exclude: /node_modules/,
                     use: {
                     loader: 'babel-loader'
                     }
             },
             {
                 test: /\.scss$/,
                 use: [ // チェーンにする場合、配列を指定する
                     {loader: 'style-loader'},
                     {loader: 'css-loader'},
                     {loader: 'sass-loader'}
                 ]
              }
        ]
   }
};
