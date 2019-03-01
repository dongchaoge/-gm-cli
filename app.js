/* global module */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const compression = require('compression');
// const logger = require('morgan');

const app = express();
// const isDev = process.env.NODE_ENV !== 'production';
// view engine setup
app.set('trust proxy', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('x-powered-by', false);
require('console-stamp')(console, {
  pattern: 'yyyy/mm/dd HH:MM:ss'
});
// app.use(logger('dev'));

// console.log('NODE_ENV', process.env.NODE_ENV);

// if (isDev) {
//     // 修改文件后自动刷新页面
//     // console.log('NODE_ENV',process.env.NODE_ENV)
//     let webpack = require('webpack');           // eslint-disable-line
//     const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line
//     const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line
//     const webpackDevConfig = require('./webpack.dev.config.js'); // eslint-disable-line

//     const compiler = webpack(webpackDevConfig);
//     // attach to the compiler & the server
//     app.use(webpackDevMiddleware(compiler, {

//         // public path should be the same with webpack config
//         publicPath: webpackDevConfig.output.publicPath,
//         noInfo: true,
//         stats: {
//             colors: true
//         }
//     }));
//     app.use(webpackHotMiddleware(compiler));
// }
// uncomment after placing your favicon in /public
app.use(favicon(`${__dirname}/public/images/favicon.ico`));
app.use(compression());
app.use(bodyParser.json({
  limit: '150mb'
}));
app.use(bodyParser.urlencoded({
  limit: '150mb',
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders(res, path) {
    switch (express.static.mime.lookup(path)) {
      case 'application/javascript':
        return res.setHeader('Cache-Control', 'max-age=10d')
      case 'text/css':
        return res.setHeader('Cache-Control', 'max-age=10d')
    }
  }
}));
const loader = require('./libs/loadConfig');
const cfg = require(loader.configFile)[loader.projectName]; // eslint-disable-line
const sessionConfig = cfg.sessionConfig;
const redisConfig = cfg.redis.sessionServer;
// 设置session使用 redis 或是临时文件
if (sessionConfig && sessionConfig.store && sessionConfig.store === 'redis') {
  console.log('---session store in redis---');
  app.use(session({
    secret: sessionConfig.secret,
    store: new RedisStore({
      host: redisConfig.host,
      port: redisConfig.port,
      ttl: redisConfig.ttl,
      db: redisConfig.db,
      pass: redisConfig.pwd
    }),
    cookie: {
      maxAge: sessionConfig.maxAge,
      secure: false
    },
    resave: false,
    saveUninitialized: true
  }));
} else { // tmp file
  console.log('---session store in tmp_file---');
  app.use(session({
    secret: sessionConfig.secret,
    cookie: {
      maxAge: sessionConfig.maxAge,
      secure: false
    },
    resave: false,
    saveUninitialized: true
  }));
}


app.use('/upload', require('./routes/upload'));
app.use('/mobile', require('./routes/mobile'));
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ?
    err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
