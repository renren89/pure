import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config from './webpack.config.dev';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddlware from 'webpack-hot-middleware';

const app = express();
const compiler = webpack(config);
const port = process.argv[2] || 3000;

app.use((webpackMiddleware)(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use((webpackHotMiddlware)(compiler));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://localhost:${port}`);
});