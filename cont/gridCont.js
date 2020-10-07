const myDB = require("../config/all-repo");

function myCont(nav) {
  function midware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect("/home");
    }
  } //
  async function getAll(req, res, tbl, flds, viewfile, title) {
    const data = await myDB.getAll(flds, tbl);
    console.log(JSON.stringify(data));
    res.render(viewfile, {
      nav,
      title,
      data,
    });
  }
  async function getByid(req, res, tbl, flds) {
    const { id } = req.params;
    const book = await myDB.getByid(flds, tbl, id);
    console.log(JSON.stringify(book));
    res.render("bookView", {
      nav,
      title: "Library",
      book: book[0],
    });
  } //

  async function addRecord(req, res) {
    try {
      const user = req.body;
      console.log(JSON.stringify(user));
      if (!user.username) {
        res.send({ error: "Fail", msg: "UserName/Password Required!" });
      } else {
        const results = await myDB.addRecord(user, "users");
        console.log(JSON.stringify(results));
        req.login(user, () => {
          res.send({ error: "Success", msg: "User Regisrted Succesfully" });
        });
      }
    } catch (error) {
      console.log(error);
    }
  } //

  async function deleteRecordById(req, res) {
    try {
      const { id } = req.body;
      console.log(JSON.stringify("DELETE ID:" + id));
      if (!id) {
        res.send({ error: "Fail", msg: "UserName/Password Required!" });
      } else {
        const results = await myDB.deleteRecord(id, "users");
        console.log(JSON.stringify(results));
        res.send({ error: "Success", msg: "User Regisrted Succesfully" });
      }
    } catch (error) {
      console.log(error);
    }
  } //

  return {
    getAll,
    getByid,
    midware,
    addRecord,
    deleteRecordById,
  };
}

module.exports = myCont;
