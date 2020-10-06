var express = require("express");
var bookRouter = express.Router();
var bookCont = require('../cont/myCont');

/* GET Books listing. */
function router(nav) {
  const { getAll,getByid, midware } = bookCont(nav);
  bookRouter.use(midware);
  bookRouter.route("/").get(getAll);
  bookRouter.route("/:id").get(getByid);

  return bookRouter;
}

module.exports = router;
