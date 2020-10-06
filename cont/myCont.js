const myDB = require("../config/all-repo");

function bookCont(nav) {
    function midware(req, res, next) {
        if (req.user) {
        next();
         } else {
            res.redirect("/home");
        }
    };//
    async function getAll(req, res) {
        const books = await myDB.getAll(['id', 'title', 'author'], 'books');
        console.log(JSON.stringify(books));
        res.render("books", {
            nav,
            title: "Library",
            books,
        });
    };
    async function getByid(req, res) {
        const { id } = req.params;
        const book = await myDB.getByid(['id', 'title', 'author'], 'books', id);
        console.log(JSON.stringify(book));
        res.render("bookView", {
            nav,
            title: "Library",
            book: book[0],
        });
    };//

    async function addRecord(req, res) {
          try {
            const user = req.body;
            console.log(JSON.stringify(user));
            const results = await myDB.addRecord(user, "users");
            console.log(JSON.stringify(results));
            req.login(user, () => {
              res.send({error:'Success', msg:'User Regisrted Succesfully'});
            });
          } catch (error) {
            console.log(error);
          }
      };//


    return {
        getAll,
        getByid,
        midware,
        addRecord
    }
}

module.exports = bookCont;