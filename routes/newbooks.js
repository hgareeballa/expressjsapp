var express = require("express");
var newbookRouter = express.Router();
var myDB = require("../config/all-repo");

/* GET Books listing. */
function router(nav) {
    //const { getAll, getByid, midware, deleteRecordById } = myCont(nav);
    //userRouter.use(midware);
    newbookRouter.route("/").get((req, res) => {
        res.render("grid_view", {
            title: 'Gridview Books Title',
            name: 'Book',
            fields: [{ id: 'id', name: 'ID' }, { id: 'title', name: 'Book Title' }, { id: 'author', name: 'Book Title' },],
            CRUDfields: [{ id: 'title', name: 'Book Title' }, { id: 'author', name: 'Book Author' },],
            loadurl: '/newbook/alldatawithlimit',
            deleteurl: '/newbook/delete',
            updateurl: '/newbook/update',
            addurl: '/newbook/add'
        });
    });

    newbookRouter.route("/ro").get((req, res) => {
        res.render("grid_view_ro", {
            title: 'Gridview Books Title',
            name: 'Book',
            fields: [{ id: 'id', name: 'ID' }, { id: 'title', name: 'Book Title' }, { id: 'author', name: 'Book Title' },],
            loadurl: '/newbook/alldatawithlimit',
        });
    });

    newbookRouter.route("/alldata").post((req, res) => {
        console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>>>>>>Get ALL Rows>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
        (async function q() {
            console.log(req.body);
            const data = await myDB.getAll(["id", "title", "author"], "books");
            res.json({ rows: data });
        })();
    });
    newbookRouter.route("/alldatawithlimit").post((req, res) => {
        console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>>>>>>GetRows>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
        (async function q() {
            console.log(req.body);
            let { page, rows } = req.body;
            let offset = (page - 1) * rows;
            const data = await myDB.getRows(["id", "title", "author"], "books", rows, offset);
            const total = await myDB.getCount("books");
            console.log(total);
            const { count } = total[0];
            console.log("Count:", count);
            //console.log(JSON.stringify(data));
            res.json({ total: count, rows: data });
        })();
    });

    newbookRouter.route("/delete").post((req, res) => {
        console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>>>>>>Delete>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
        (async function q() {
            const { id } = req.body;
            console.log("DELETE ID:" + id);
            const data = await myDB.deleteRecord(id, "books");
            console.log("results:", data);
            if (data) {
                res.json({
                    success: true,
                    successMsg: "Record Deleted Succesfully....",
                });
            } else {
                res.json({ errorMsg: "Some errors occured...." });
            }
        })();
    });
    newbookRouter.route("/add").post((req, res) => {
        console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>>>>>>ADD>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
        (async function q() {
            const flds = req.body;
            console.log("Adding :", flds);
            const results = await myDB.addRecord(flds, "books");
            console.log("results:", results);
            if (results) {
                res.json({ success: true, successMsg: "Record Added Succesfully...." });
            } else {
                res.json({ errorMsg: "Some errors occured...." });
            }
        })();
    });

    newbookRouter.route("/update/:id").post((req, res) => {
        console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>>>>>>Update>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
        (async function q() {
            const { id } = req.params;
            console.log("Update ID:" + id);
            console.log(req.body);
            const data = await myDB.updateRecord(req.body, id, "books");
            console.log("results:", data);
            if (data) {
                //echo json_encode(array('success'=>true));
                res.json({
                    success: true,
                    successMsg: "Record Updated Succesfully....",
                });
            } else {
                res.json({ errorMsg: "Some errors occured...." });
            }
        })();
    });

    return newbookRouter;
}

module.exports = router;
