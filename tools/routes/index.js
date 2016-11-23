let express = require("express");
let router = express.Router();

router.use('/questions', require('./questions'));
router.use('/users', require('./users'));

module.exports = router;