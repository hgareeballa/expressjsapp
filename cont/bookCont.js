const myDB = require("../config/all-repo");

function bookCont(nav) {
    async function allBooks(req, res) {
        res.render("grid_view", {
            nav,
            title: 'Gridview Books Title',
            name: 'Book',
            fields: [{ id: 'id', name: 'ID' }, { id: 'title', name: 'Book Title' }, { id: 'author', name: 'Book Title' },],
            CRUDfields: [{ id: 'title', name: 'Book Title' }, { id: 'author', name: 'Book Author' },],
            loadurl: '/newbook/alldatawithlimit',
            deleteurl: '/newbook/delete',
            updateurl: '/newbook/update',
            addurl: '/newbook/add'
        });
    }//

    async function allBooksRo(req, res) {
        res.render("grid_view_ro", {
            nav,
            title: 'Gridview Books Title',
            name: 'Book',
            fields: [{ id: 'id', name: 'ID' }, { id: 'title', name: 'Book Title' }, { id: 'author', name: 'Book Title' },],
            loadurl: '/newbook/alldatawithlimit',
        });
    }//

    async function allBooksdatawithlimit(req, res) {
        let { page, rows } = req.body;
        let offset = (page - 1) * rows;
        const data = await myDB.getRows(["id", "title", "author"], "books", rows, offset);
        const total = await myDB.getCount("books");
        console.log(total);
        const { count } = total[0];
        console.log("Count:", count);
        res.json({ total: count, rows: data });
    }//

    async function deleteBook(req, res) {
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
    }//

    async function addBook(req, res) {
        const flds = req.body;
        console.log("Adding :", flds);
        const results = await myDB.addRecord(flds, "books");
        console.log("results:", results);
        if (results) {
            res.json({ success: true, successMsg: "Record Added Succesfully...." });
        } else {
            res.json({ errorMsg: "Some errors occured...." });
        }
    }//

    async function updateBook(req, res) {
        const { id } = req.params;
        console.log("Update ID:" + id);
        console.log(req.body);
        const data = await myDB.updateRecord(req.body, id, "books");
        console.log("results:", data);
        if (data) {
            res.json({
                success: true,
                successMsg: "Record Updated Succesfully....",
            });
        } else {
            res.json({ errorMsg: "Some errors occured...." });
        }
    }//

    return {
        allBooks,
        allBooksdatawithlimit,
        allBooksRo,
        deleteBook,
        updateBook,
        addBook
    };
}

module.exports = bookCont;
