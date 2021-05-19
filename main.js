const express = require("express");
const { uuid } = require('uuidv4');
const { User, Comment, Articles } = require("./schema");
const db = require("./db");
const app = express();
require("dotenv").config();
const port = 5000;
app.use(express.json());

/*const articles = [
    {
        id: 1,
        title: 'How I learn coding?',
        description:
            'Lorem, Quam, mollitia.',
        author: 'Jouza',
    },
    {
        id: 2,
        title: 'Coding Best Practices',
        description:
            'Lorem, ipsum dolor sit, Quam, mollitia.',
        author: 'Besslan',
    },
    {
        id: 3,
        title: 'Debugging',
        description:
            'Lorem, Quam, mollitia.',
        author: 'Jouza',
    },
];*/

const getAllArticles = (req, res) => {
    Articles.find({})
        .then((result) => { res.json(result); })
        .catch((err) => { res.status(404); res.json(err); });
}

const getArticlesByAuthor = async (req, res) => {
    let art1;
    await User.findOne({ firstName: req.query.author })
        .then((result) => { res.status = 200, art1 = result._id })
        .catch((err) => { console.log(err) });

    Articles.find({ author: art1 })
        .then((result) => { res.status = 200, res.json(result); })
        .catch((err) => { res.status(404); res.json(err); });
}


const getAnArticleById = (req, res) => {
    Articles.findOne({ _id: req.query.id })
        .populate("author", "firsName")
        .exec()
        .then((result) => { res.status(200); res.json(result); })
        .catch((err) => { res.status(404); res.json(err); });
};

const createNewArticle = async (req, res) => {
    res.status(201);
    const { title, description, author } = req.body
    let art;
    await User.findOne({ firstName: "mostafa" })
        .then((result) => {
            art = result;
        })
        .catch((err) => {
            console.log(err);
        });
    let art1 = new Articles({ title, description, author: art._id })
    art1.save().then((result) => { res.status(201); res.json(result); })
        .catch((err) => { res.send(err); });
}

const updateAnArticleById = (req, res) => {
    Articles.updateOne({ id: req.params._id }, { title: req.body.title, description: req.body.description } = req.body, { new: true })
        .then((result) => { res.json(result) })
        .catch((err) => { res.status = 404; res.json(err) });
}


const deleteArticleById = (req, res) => {
    Articles.findByIdAndRemove({ _id: req.params.id })
        .then((result) => { res.send("Deleted Complete"); })
        .catch((err) => { res.status = 404; res.send(err); })
}


const deleteArticlesByAuthor = (req, res) => {
    Articles.deleteMany({ author: req.body.author })
        .then((result) => { res.send("Deleted"); })
        .catch((err) => { res.send(err); });
}

const createNewAuthor = (req, res) => {
    const { firstName, lastName, age, country, email, password } = req.body
    const aut = new User({ firstName, lastName, age, country, email, password })
    aut.save().then(result => { res.status(201); res.json(result) }).catch(err => { res.send(err) })
}

const login = (req, res) => {
    User.find({ email: req.body.email, password: req.body.password })
        .then((result) => {
            if (result) {
                res.status(200);
                res.json("Valid login credentials")
            } else {
                res.status(401);
                res.json("Invalid login credentials")
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

const createNewComment = async (req, res) => {
    const id = req.params.id;
    const { comment, commenter } = req.body;
    const comm = new Comment({ comment, commenter });
    let commId;

    comm.save()
        .then((result) => {
            commId = result._id;
            Articles.updateOne({ _id: id }, { $push: { comments: commId } }).then(() => { res.json(result); });
        })
        .catch((err) => { res.json(err); });
};

app.get("/articles", getAllArticles);
app.get("/articles/search_1", getArticlesByAuthor);
app.get("/articles/search_2", getAnArticleById);
app.post("/articles", createNewArticle);
app.put("/articles/:id", updateAnArticleById);
app.delete("/articles/:id", deleteArticleById);
app.delete("/articles", deleteArticlesByAuthor);
app.post("/users", createNewAuthor);
app.post("/login", login);
app.post("/articles/:id/comments", createNewComment);

app.listen(port, () => {
    console.log(`project_3 listening at http://localhost:${port}`);
});