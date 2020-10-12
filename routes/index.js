var express = require("express");
var indexRouter = express.Router();

/* GET home page. */
function router(nav) {
  indexRouter.route("/").get((req, res) => {
    res.render("index", {
      nav,
      title: "Home Page TGA",
    });
  });
  indexRouter.route("/home").get((req, res) => {
    res.render("home", {
      nav,
      title: "Home Page TGA",
    });
  });
  indexRouter.route("/logout").get((req, res) => {
    req.logout();
    res.redirect('/home');
  });
  return indexRouter;
}
module.exports = router;
