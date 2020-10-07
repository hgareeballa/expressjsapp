var express = require("express");
var bookRouter = express.Router();
var myCont = require('../cont/myCont');

/* GET Books listing. */
function router(nav) {
  const { getAll,getByid, midware } = myCont(nav);
  bookRouter.use(midware);
  bookRouter.route("/").get((req,res)=>{
    getAll(req,res,'books',['id', 'title', 'author'],'books','Books View')
  });
  bookRouter.route("/:id").get((req,res)=>{
    getByid(req,res,'books',['id', 'title', 'author'])
  });

  return bookRouter;
}

module.exports = router;
