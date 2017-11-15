const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//path
console.log(path.join(__dirname,'./assets/react-output'));

module.exports = (env) => {
    const isProduction = env === 'production' 
    const CSSExtract = new ExtractTextPlugin('styles.css'); 
    return {
        entry: './assets/app/app.js',
        output: {
            path: path.join(__dirname,'./assets/react-output'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: CSSExtract.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap:true
                            }
                    },{
                        loader: 'sass-loader',
                        options: {
                            sourceMap:true
                        }
                    }
                ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname,'./assets/react-output'),
            historyApiFallback: true
        }
    };
};
