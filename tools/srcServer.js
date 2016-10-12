import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import jwt from 'express-jwt';

let mongoose = require("mongoose");


/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

let authenticate = jwt({
   secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
   audience: process.env.AUTH0_CLIENT_ID
});

app.use(require('webpack-dev-middleware')(compiler, {
   noInfo: true,
   publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

//mongoose.connect('mongodb://localhost:27017/qgrid');  // connect to local Mongo DB in db "qgrid"

// Establish routes

let routes = require("./routes");
app.use('/api', routes);

app.get('/api/public', function(req, res) {
   res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', authenticate, function(req, res) {
   res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

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
