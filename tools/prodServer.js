let express = require("express");
let path = require("path");
let open = require("open");
let compression = require("compression");

let mongoose = require("mongoose");

/*eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

mongoose.connect('mongodb://localhost:27017/qgrid');  // connect to local Mongo DB in db "qgrid"

var routes = require("./routes");
app.use('/api', routes);

app.get('*', function(req, res) {
   res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
   if (err) {
      console.log(err);
   } else {
      open(`http://localhost:${port}`);
   }
});
