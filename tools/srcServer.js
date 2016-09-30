import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

let mongoose = require("mongoose");


/* eslint-disable no-console */

const port = 3001;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
   noInfo: true,
   publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

mongoose.connect('mongodb://localhost:27017/qgrid');  // connect to local Mongo DB in db "qgrid"

// Establish routes

var routes = require("./routes");
app.use('/api', routes);

app.get('*', function(req, res) {
   res.sendFile(path.join( __dirname, "../react_src/index.html"));
});

app.listen(port, function(err) {
   if (err) {
      console.log(err);
   } else {
      open(`http://localhost:${port}`);
   }
});
