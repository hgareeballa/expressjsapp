var express = require("express");
var bookRouter = express.Router();
var { allBooks, allBooksRo, allBooksdatawithlimit, deleteBook, addBook, updateBook, getRowsWithSort } = require('../cont/bookCont')();
var midware = require('../cont/midware');
var myDB = require('../config/all-repo');

function router() {
    bookRouter.use(midware);
    bookRouter.route("/").get((req, res) => {
        allBooks(req, res);
    });
    bookRouter.route("/ro").get((req, res) => {
        allBooksRo(req, res);
    });
    bookRouter.route("/alldatawithlimit").post((req, res) => {
        allBooksdatawithlimit(req, res);
    });
    bookRouter.route("/delete").post((req, res) => {
        deleteBook(req, res);
    });
    bookRouter.route("/add").post((req, res) => {
        addBook(req, res);
    });
    bookRouter.route("/update/:id").post((req, res) => {
        updateBook(req, res);
    });

    return bookRouter;
}

module.exports = router;
