import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const src = __dirname + '/src'
const PAGES = fs.readdirSync(src).filter(file => file.includes('.html')) // Массив с названиями файлов в папке src с расширением html

export default {
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  devServer: {
    port: 3000, // Порт сервера
    open: true, // Открывает бразуер после запуска сервера
    compress: true, // Включает сжатие gzip для более быстрой загрузки страниц
    hot: false, // Обновление страницы после изменений, без перезагрузки
    client: {
      overlay: { // Показывает во весь экран ошибки, если они есть
        errors: true, // Только ошибки
        warnings: false // Предупреждения не показывать
      }
    }
  },
  plugins: [
    // Вывод html файлов
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `./src/${page}`, // Где находится файл
      filename: `./${page}`, // Название файла
      inject: page === 'index.html' ? false : 'body', // Все скрипты помещаются внизу body, кроме страницы index.html
      minify: {
        collapseWhitespace: false, // Убирать пространство между тегами не нужно
        removeComments: false, // Удалять комментарии не нужно
      },
    })),
    // Очищаем папку dist
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    }),
  ],
  module: {
      rules: [
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
        // HTML
        {
          test: /\.html$/i,
          use: 'html-loader'
        },
        // CSS
        // {
        //   test: /\.(s[ac]ss|css)$/i,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     'css-loader', 
        //     'sass-loader'
        //   ]
        // },
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'autoprefixer'
                  ],
                },
                // sourceMap: true
              }
            },
            'sass-loader',
          ]
        },
        // Изображения
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: content => {
              return content.filename.replace('src/', '')
            },
          }
        },
        // Шрифты
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
          type: 'asset/resource',
          generator: {
            filename: content => {
              return content.filename.replace('src/', '')
            },
          }
        },
        // Видео
        {
          test: /\.(mp4|mp3)$/i,
          type: 'asset/resource',
          generator: {
            filename: content => {
              return content.filename.replace('src/', '')
            },
          }
        },
        // JSON файлы
        {
          test: /\.(json)$/i,
          type: 'asset/resource',
          generator: {
            filename: content => {
              return content.filename.replace('src/', '')
            },
          }
        },
      ]
  },
}