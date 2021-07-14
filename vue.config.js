/* eslint-disable @typescript-eslint/no-var-requires */
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
	devServer: {
		host: '0.0.0.0',
	},
	lintOnSave: false,
	css: {
		extract: isProduction,
	},
	productionSourceMap: false,
	publicPath: './',
	chainWebpack: config => {
		if (isProduction) {
			config.plugin('html').tap(args => {
				args[0].cdn = {
					css: [
						"https://at.alicdn.com/t/font_2493604_92b74ed8whl.css",
						"https://cdn.jsdelivr.net/npm/element-plus@1.0.2-beta.55/lib/theme-chalk/display.css"
					],
					js: [
						"https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js",
						"https://cdn.jsdelivr.net/npm/konva@8.0.4/konva.min.js",
						"https://cdn.jsdelivr.net/npm/js-cookie@2.2.1/src/js.cookie.min.js",
						"https://cdn.jsdelivr.net/npm/vue@3.1.4/dist/vue.global.prod.js",
						"https://cdn.jsdelivr.net/npm/element-plus@1.0.2-beta.55/lib/index.full.js",
						"https://cdn.jsdelivr.net/npm/vuex@4.0.2/dist/vuex.global.min.js",
						"https://cdn.jsdelivr.net/npm/vue-router@4.0.10/dist/vue-router.global.min.js",
					]
				}
				return args
			})
		} else {
			config.plugin('html').tap(args => {
				args[0].cdn = {
					css: [
						"https://at.alicdn.com/t/font_2493604_92b74ed8whl.css",
						"https://cdn.jsdelivr.net/npm/element-plus@1.0.2-beta.55/lib/theme-chalk/display.css"
					],
					js: []
				}
				return args
			})
		}
	},
	configureWebpack: config => {
		if (isProduction) {
			config.plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							drop_debugger: true,
							drop_console: true,
							pure_funcs: ['console.log()']
						}
					},
					sourceMap: false,
					parallel: true
				})
			)
			config.plugins.push(
				new CompressionPlugin({
					algorithm: 'gzip',
					test: /\.js$|\.css$/,
					filename: '[file].gz[query]',
					minRatio: .8,
					threshold: 1024 * 240,
					deleteOriginalAssets: false,
				}))
			config.externals = {
				"axios": "axios",
				konva: 'Konva',
				'js-cookie': 'Cookies',
				vue: 'Vue',
				"element-plus": "ElementPlus",
				vuex: 'Vuex',
				'vue-router': 'VueRouter',
			}

			config.optimization = {
				splitChunks: {
					cacheGroups: {
						vendor: {
							chunks: 'all',
							test: /node_modules/,
							name: 'vendor',
							minChunks: 2,
							maxInitialRequests: 5,
							minSize: 0,
							priority: 100
						},
					}
				}
			}



		}
	},
}