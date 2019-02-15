const path = require('path')
const webpack = require('webpack')
const config = require('./configs/config')
const vueLoaderConfig = require('./configs/vue-loader.conf');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

function createConfig (option = {}) {
  const { isWeex, minify } = option
  const suffix = `.${isWeex ? 'weex' : 'web'}${minify ? '.min': '' }.js`
  const webConfig = {
    entry: option.entry,
    output: {
      path: path.resolve(__dirname, option.outputPath || 'dist'),
      filename: (option.outputName || 'bundle') + suffix
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'vue-loader',
          options: Object.assign(vueLoaderConfig({useVue: true, usePostCSS: false}), {
            /**
             * important! should use postTransformNode to add $processStyle for
             * inline style prefixing.
             */
            optimizeSSR: false,
            postcss: [
              // to convert weex exclusive styles.
              require('postcss-plugin-weex')(),
              require('autoprefixer')({
                browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
              }),
              require('postcss-plugin-px2rem')({
                // base on 750px standard.
                rootValue: 75,
                // to leave 1px alone.
                minPixelValue: 1.01
              })
            ],
            compilerModules: [
              {
                postTransformNode: el => {
                  // to convert vnode for weex components.
                  require('weex-vue-precompiler')()(el)
                }
              }
            ]
            
          })
        }]
      }]
    },
    plugins: []
  }
  const weexConfig = {
    entry: option.entry,
    output: {
      path: path.resolve(__dirname, option.outputPath || 'dist'),
      filename: (option.outputName || 'bundle') + suffix
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [{
            loader: 'babel-loader'
          }]
        },
        {
          test: /\.vue(\?[^?]+)?$/,
          use: [{
            loader: 'weex-loader',
            options: vueLoaderConfig({useVue: false})
          }]
        },
        {
          test: /\.(otf|eot|svg|ttf|woff|woff2)/,
          use: "url-loader?limit=50000&name=[path][name].[ext]"
        },
        {
          test: /\.css/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]?[hash]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
		node: config.nodeConfiguration,
    plugins: []
  }

  if (minify && isWeex) {
    weexConfig.plugins.push(new UglifyJSPlugin())
    weexConfig.plugins.push(new webpack.BannerPlugin({
      banner:  '// { "framework": "Vue" }\n"use weex:vue";\n',
      raw: true
    }))
    return weexConfig
  }
  if (!minify && isWeex) {
    weexConfig.plugins.push(new webpack.BannerPlugin({
      banner:  '// { "framework": "Vue" }\n"use weex:vue";\n',
      raw: true
    }))
    return weexConfig
  }
  if (minify && !isWeex) {
    webConfig.plugins.push(new UglifyJSPlugin())
    return webConfig
  }
  if (!minify && !isWeex) {
    return webConfig
  }
  
}

function generateWebpackConfigs (options) {
  const buildOptions = []
  for (const name in options) {
    const option = typeof options[name] === 'string'
      ? ({ entry: options[name] })
      : options[name]
    option.outputName = name
    buildOptions.push(Object.assign({}, option, { isWeex: true, minify: false }))
    buildOptions.push(Object.assign({}, option, { isWeex: false, minify: false }))
    buildOptions.push(Object.assign({}, option, { isWeex: true, minify: true }))
    buildOptions.push(Object.assign({}, option, { isWeex: false, minify: true }))
  }
  return buildOptions.map(createConfig)
}

module.exports = generateWebpackConfigs({
  login: path.resolve('src/entries', 'login.js'),
  forgetpassword: path.resolve('src/entries', 'forgetpassword.js'),
  promptnew: path.resolve('src/entries', 'promptnew.js'),
  promptold: path.resolve('src/entries', 'promptold.js'),
  app: path.resolve('src/entries', 'app.js'),
  motiondetails: path.resolve('src/entries/dist', 'motiondetails.js')
})
