module.exports = {
    entry: "./src/barEntry.jsx",
    output: {
        path: __dirname+'/public',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            }
        ]
    },
    externals: {
//        'ramda': 'ramda',
//        'rx': 'rx'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};