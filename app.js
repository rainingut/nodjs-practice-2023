// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

import createError from 'http-errors';
import express from 'express';
import path,{ dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import todosRouter from './routes/todo.router.js';
// import swaggerDoc from './swagger-output.json'; // 無法讀取JSON檔，要另外用套件讀取檔案
import swaggerUI from 'swagger-ui-express';
import fs from 'fs/promises'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// 讀取JSON檔後成為buffer格式
const swaggerDocfilePath = path.join(process.cwd(), '/', 'swagger-output.json');
const swaggerBuffer = await fs.readFile(swaggerDocfilePath);
// 將buffer轉為物件格式
const swaggerDoc = JSON.parse(swaggerBuffer);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todos', todosRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export default app;
