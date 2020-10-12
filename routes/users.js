var express = require("express");
var userRouter = express.Router();
var myCont = require("../cont/myCont");
var myDB = require("../config/all-repo");

/* GET Books listing. */
function router(nav) {
  const { getAll, getByid, midware, deleteRecordById } = myCont(nav);
  //userRouter.use(midware);
  userRouter.route("/").get((req, res) => {
    res.render("users", { nav, title: 'Users Page' });
  });
  userRouter.route("/new").get((req, res) => {
    res.render("grid_view", {
      nav,
      title: 'Gridview Users Title',
      name: 'User',
      fields: [{ id: 'id', name: 'ID' }, { id: 'username', name: 'User Name' }, { id: 'password', name: 'Password' },],
      CRUDfields: [{ id: 'username', name: 'User Name' }, { id: 'password', name: 'Password' },],
      loadurl: '/users/all',
      deleteurl: '/users/delete',
      updateurl: '/users/update',
      addurl: '/users/add'
    });
  });
  userRouter.route("/alldata").post((req, res) => {
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>Get ALL Rows>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
    (async function q() {
      console.log(req.body);
      const data = await myDB.getAll(
        ["id", "username", "password"],
        "users"
      );
      // console.log(JSON.stringify(data));
      res.json({ rows: data });
    })();
  });

  userRouter.route("/all").post((req, res) => {
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>GetRows>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
    (async function q() {
      console.log(req.body);
      let { page, rows } = req.body;
      let offset = (page - 1) * rows;
      const data = await myDB.getRows(
        ["id", "username", "password"],
        "users",
        rows,
        offset
      );
      const total = await myDB.getCount("users");
      console.log(total);
      const { count } = total[0];
      console.log("Count:", count);
      // console.log('Count:',count[0].count);
      console.log(JSON.stringify(data));
      res.json({ total: count, rows: data });
    })();
  });

  userRouter.route("/delete").post((req, res) => {
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>Delete>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
    (async function q() {
      const { id } = req.body;
      console.log("DELETE ID:" + id);
      const data = await myDB.deleteRecord(id, "users");
      console.log("results:", data);
      if (data) {
        //echo json_encode(array('success'=>true));
        res.json({
          success: true,
          successMsg: "Record Deleted Succesfully....",
        });
      } else {
        res.json({ errorMsg: "Some errors occured...." });
        //echo json_encode(array('errorMsg'=>'Some errors occured.'));
      }
    })();
  });

  userRouter.route("/add").post((req, res) => {
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>ADD>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
    (async function q() {
      const flds = req.body;
      console.log("Adding :", flds);
      const results = await myDB.addRecord(flds, "users");
      console.log("results:", results);
      if (results) {
        res.json({ success: true, successMsg: "Record Added Succesfully...." });
      } else {
        res.json({ errorMsg: "Some errors occured...." });
      }
    })();
  });

  userRouter.route("/update/:id").post((req, res) => {
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>Update>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
    (async function q() {
      const { id } = req.params;
      console.log("Update ID:" + id);
      console.log(req.body);
      const data = await myDB.updateRecord(req.body, id, "users");
      console.log("results:", data);
      if (data) {
        //echo json_encode(array('success'=>true));
        res.json({
          success: true,
          successMsg: "Record Updated Succesfully....",
        });
      } else {
        res.json({ errorMsg: "Some errors occured...." });
        //echo json_encode(array('errorMsg'=>'Some errors occured.'));
      }
    })();
  });

  return userRouter;
}

module.exports = router;
