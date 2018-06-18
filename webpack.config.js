const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    //ビルドするファイルを指定する
    entry: {
        index: './src/index.js',
        about: './src/about.js'
    },
    //ビルド後のファイル名とパスを指定
    output: {
        filename: '[name].bundle.js',// [name]はentryで設定したnameに置き換わる
    },
    //ビルド対象の拡張子設定
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    module: {
        //test：Loaderの対象の拡張子
        //user：使用するLoader
        //exclude：特定のディレクトリ配下をLoaderの適用対象外としたい場合など
        rules: [
            //raw-loaderはimportしたファイルを文字列として処理してくれるLoader
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            //BabelのLoader設定
            {
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
            //CSS用のLoader設定
            //css-loader	CSSをJavascriptとして実行可能な形式に変換
            //sass-loader   SASSをCSSに変換
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,// javascriptとしてバンドルせず css として出力する
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    //webpack4に伴い修正
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        })
    ],
    //重複して使用されているチャンクを共通チャンクとして出力
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    }
};
