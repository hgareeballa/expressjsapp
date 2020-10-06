var db = require("./db");

module.exports = {
  getBooks: function () {
    return db.select("id", "title", "author").from("books")
      .then(function (rows) {
        return rows;
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
        //db.destroy();
        //console.log("Closing Connections ");
      });
  },
  getBook: function (id) {
    return db.select("id", "title", "author").from("books").where('id',id)
      .then(function (rows) {
        return rows;
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
        //db.destroy();
        //console.log("Closing Connections ");
      });
  },
};
