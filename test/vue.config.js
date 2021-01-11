const path = require('path')
// 是否为开发环境
// 代码压缩
const TerserPlugin = require('terser-webpack-plugin')
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProd = process.env.VUE_APP_NODE_ENV === 'production'
function resolve (dir) {
  return path.join(__dirname, dir)
}

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    axios: 'axios'
  },
  // cdn的css链接
  css: [],
  // cdn的js链接
  js: [
    'https://imgcdn2.huangjinx.com/bjh-lite/js/axios.min.js'
  ]
}
module.exports = {
  publicPath: './',
  indexPath: 'index.html',
  css: {
    loaderOptions: {
      less: {
        sourceMap: true,
        javascriptEnabled: true
      }
    }
  },

  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    config.externals = cdn.externals
    // 别名配置
    config.resolve.alias = {
      '@': resolve('src'),
      '@views': resolve('src/views'),
      '@js': resolve('src/js'),
      '@const': resolve('src/js/const'),
      '@util': resolve('src/js/util'),
      '@api': resolve('src/js/api'),
      '@config': resolve('src/js/config'),
      '@bus': resolve('src/js/bus.js'),
      '@style': resolve('src/style'),
      '@assets': resolve('src/assets'),
      '@image': resolve('src/assets/image'),
      '@components': resolve('src/components')
    }
    // 生产环境相关配置
    if (isProd) {
      // 代码压缩
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {}
          }
        })
      )

      // gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      )
    }
  },

  chainWebpack: config => {
    // 注入cdn
    config.plugin('html').tap(args => {
      args[0].cdn = {}
      // cdn css 无论在本地还是生产，都会注入
      if (cdn.css.length) args[0].cdn.css = cdn.css
      // 注入cdn
      args[0].cdn = cdn
      return args
    })
    // 删除默认配置中处理svg
    config.module.rules.delete('svg')
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svgs')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/assets/svgs'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  },
  devServer: {
    port: 8081
  }
}
