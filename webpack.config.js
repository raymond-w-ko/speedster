var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  "devtool": "inline-source-map",
  "context": __dirname,
  "entry": ["./src/index.js", "./styles/main.scss"],
  "output": {
    "path": __dirname + "",
    "filename": "speedster.js"
  },
  module: {
    rules: [
      /*
      your other rules for JavaScript transpiling go in here
      */
      { // regular css files
        test: /\.css$/,
        use: ExtractTextPlugin.extract(["css-loader"])
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "speedster.css",
      allChunks: true,
    })
  ],
}
