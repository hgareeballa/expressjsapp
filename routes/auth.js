var express = require("express");
const { NotExtended } = require("http-errors");
var authRouter = express.Router();
const passport = require("passport");
var authCont = require('../cont/myCont');

/* GET home page. */
function router(nav) {
  const { addRecord,midware } = authCont(nav);

  authRouter.route("/signup").get((req, res) => {
    res.render("signup", { nav, title: "Register PAge" });
  });
  authRouter.route("/signup").post(addRecord);

  authRouter.route("/signin").get((req, res) => {
    res.render("signin", { nav, title: "Login PAge" });
  });
  authRouter.route("/signin").post(function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.send({error:'Unauthorized', msg:'Invalid UserName/Password'}); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/books');
      });
    })(req, res, next);
  });

  authRouter.route("/profile")
    .all(midware)
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}
module.exports = router;
