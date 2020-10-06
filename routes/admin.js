var express = require("express");
var adminRouter = express.Router();
var booksRepo = require("../config/all-repo");

/* GET Books listing. */
function router(nav) {
  

  adminRouter.route("/").get((req, res) => {
    res.send('Admin Route ');
  });

  return adminRouter;
}

module.exports = router;
