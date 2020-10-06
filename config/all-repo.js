var db = require("./db");

module.exports = {
  getAll: function (flds,tbl) {
   
    return db.column(flds).select().from(tbl)
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
  getByid: function (flds,tbl,id) {
 
    return db.column(flds).select().from(tbl).where('id',id)
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
  getWhere: function (flds,tbl,wr) {
 
    return db(tbl).where(wr).select(flds)
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
  addRecord: function (flds,tbl) {

    return db(tbl).returning('id').insert(flds)
      .then(function (rows) {
        return rows;
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
       // db.destroy();
        //console.log("Closing Connections ");
      });
  },
};
