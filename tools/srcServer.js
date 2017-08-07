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

let options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                Replicaset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
mongoose.connect('mongodb://localhost:27017/qgrid', options);  // connect to local Mongo DB in db "qgrid"

// Establish routes
app.use('/api', require("./routes"));

app.get('/api/public', function(req, res) {
   res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', authenticate, function(req, res) {
   res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

app.use('/styles', express.static(path.join(__dirname, '../styles')));  // TODO: change this to a real Public directory to serve all static files
app.use('/videos', express.static(path.join(__dirname, '../videos')));
app.use('/images', express.static(path.join(__dirname, '../images')));

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
