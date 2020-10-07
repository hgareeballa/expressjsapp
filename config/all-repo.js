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
  getRows: function (flds,tbl,limit,offset) {
    return db.column(flds).select().from(tbl).limit(limit).offset(offset)
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
  getCount: function (tbl) {
    return db(tbl).count({count: '*'})
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
  deleteRecord: function (id,tbl) {
    return db(tbl).where('id',id).del()
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
  updateRecord: function (flds,id,tbl) {
    return db(tbl).where('id',id).update(flds)
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

