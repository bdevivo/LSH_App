let express = require("express");
let path = require("path");
let open = require("open");
let compression = require("compression");

let mongoose = require("mongoose");

/*eslint-disable no-console */

const port = process.env.PORT || 5000;  // assigned by Heroku
//const port = 3001;
const app = express();

app.use(compression());
app.use(express.static('dist'));

mongoose.connect('mongodb://bob:poivcx@ds047166.mlab.com:47166/heroku_fgvsh90k/qgrid');  // connect to mLab Mongo DB in db "qgrid"

const routes = require("./routes/questions");
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
