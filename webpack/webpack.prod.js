const paths = require("./paths");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

const commonOptions = require("./webpack.common");

module.exports = merge(commonOptions, {
  mode: "production",
  entry: {
    vendor: `${paths.vendors}/vendor.js`,
    main: ["@babel/polyfill", `${paths.src}/js/index.js`],
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => `css/${chunk.name.replace("/js/", "/css/")}.css`,
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      jpegtran: {
        progressive: true,
      },
      optipng: {
        optimizationLevel: 3,
        interlaced: true,
      },
    }),
  ],
});
