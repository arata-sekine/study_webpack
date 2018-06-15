const path = require('path');
// webpackのライブラリを読み込む
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  //webpackを実行するファイルを指定する
  entry: {
    index: './src/index.js',
    about: './src/about.js',
    vendor: ['react', 'react-dom']
  },
  //ビルド後のファイル名とパスを指定
  output: {
    filename: '[name].bundle.js',// [name]はentryで設定したnameに置き換わる
    path: path.resolve(__dirname, 'dist')
  },
  //ビルド対象の拡張子設定
  resolve: {
    extensions: ['.js', '.json', '.jsx','.txt']
  },
  module: {
      //Loaderの対象の拡張子をtest:に設定
      //使用するLoaderをuser:に設定
      //特定のディレクトリ配下をLoaderの適用対象外としたい場合などにexclude:に設定
    rules: [
        //raw-loaderはimportしたファイルを文字列として処理してくれるLoader
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        //BabelのLoader設定
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              //queryを設定することで.babelrcが不要になる
              query: {
              presets: ["env", "react"]
          }
        }
      },
      {
        //CSS用のLoader設定
        //sass-loader	CSSのトランスパイル
        //css-loader  CSSの@importとurl()のパス解決
        //Loaderのuse指定にExtractTextPlugin.extractを組み合わせる
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }, {
            loader: 'sass-loader',
          }]
        })
      }
    ]
  },
  plugins: [
      //CommonsChunkPlugin：重複したコードを抜き出すプラグイン
      //重複して使用されているチャンクを共通チャンクとして出力
      new webpack.optimize.CommonsChunkPlugin({
          //module.exports.name
          name: "vendor", // entryに追加したチャンク名
          minChunks: Infinity // 他のモジュールをこのチャンクに含めないことを保証
      }),
     　// ExtractTextWebpackPlugin：特定のテキストを抜き出す
      new ExtractTextPlugin({
        filename: '[name].css'
      })
  ]
};
