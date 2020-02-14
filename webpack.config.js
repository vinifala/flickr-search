const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  mode: "development",

  devtool: "source-map",

  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    contentBase: "./dist",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./templates/index.ejs",
      title: "Flickr public feed search",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
}
