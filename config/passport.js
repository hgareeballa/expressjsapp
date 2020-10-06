const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const myDB = require("../config/all-repo");

module.exports = function passportConfig(app) {
  app.use(require("cookie-parser")());
  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(
    require("express-session")({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  //store User
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  //get User

  passport.deserializeUser((user, done) => {
    //find the user then
    done(null, user);
  });


  passport.use(new LocalStrategy(function (username, password, done) {
      const user = { username, password };
      (async function q() {
        try {
          console.log(JSON.stringify(user));
          const results = await myDB.getWhere(
            ["id", "username", "password"],
            "users",
            user
          );
          console.log(">>>>>>>>>>>", JSON.stringify(results));
          var count = Object.keys(results).length;
          console.log(count);
          if (count == 0) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        } catch (error) {
          console.log(error);
          return done(error);
        }
      })();
    })
  );

}; //



// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     const user = { username, password };
//     (async function q() {
//       try {
//         console.log(JSON.stringify(user));
//         const results = await myDB.getWhere(
//           ["id", "username", "password"],
//           "users",
//           user
//         );
//         console.log(">>>>>>>>>>>", JSON.stringify(results));
//         var count = Object.keys(results).length;
//         console.log(count);
//         if (count == 0) {
//           return done(null, false);
//         } else {
//           return done(null, user);
//         }
//       } catch (error) {
//         console.log(error);
//         return done(err);
//       }
//     })();
//   }
// ));
