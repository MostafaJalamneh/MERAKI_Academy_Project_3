const express = require("express");
const { uuid } = require('uuidv4');
const {User,Article} = require("./schema");
const db = require("./db");
const app = express();
const port = 5000;
app.use(express.json());

const articles = [
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
];

const getAllArticles = (req, res) => {
    res.status(200);
    res.json(articles);
}

const getArticlesByAuthor = (req, res) => {
    res.status(200);
    const author = req.query.author
    const found = articles.filter((element) => {
        return element.author === author;
    });


    if (found) {
        res.status(200);
        res.json(found);
    } else {
        res.status(404);
        res.json("not found");
    }
}


const getAnArticleById = (req, res) => {
    res.status(200);
    const id = req.params.id
    const found = articles.find((element) => {
        return element.id == id;
    });

    if (found) {
        res.status(200);
        res.json(found);
    } else {
        res.status(404);
        res.json("not found");
    }
};

const createNewArticle = (req, res) => {
    res.status(201);
    const newArt = { title: req.body.title, description: req.body.description, author: req.body.author, id: uuid() };
    articles.push(newArt)
    res.json(newArt)
}

const updateAnArticleById = (req, res) => {
    const id = req.params.id
    const found = articles.find((element) => {
        return element.id == id;
    });
    if (found) {
        res.status(201);
        const updateArt = { title: req.body.title, description: req.body.description, author: req.body.author, id: id };
        res.json(updateArt)
    } else {
        res.status(404);
        res.json("not found");
    }
}


const deleteArticleById = (req, res) => {
    const id = req.params.id
    let index;
    const found = articles.find((element, i) => {
        index = i;
        return element.id == id;
    });
    if (found) {
        res.status(201);
        articles.splice(index, 1)
        res.json({ success: "true", message: `Success Delete article with id => ${id}` })
    } else {
        res.status(404);
    }
}


const deleteArticlesByAuthor = (req, res) => {
    const author = req.body.author
    const found = articles.filter((element, index) => {
        if (element.author === author) {
            articles.splice(index, 1)
        } else {
            res.status(404);
        }
    });
    res.status(200);
    res.json({ success: "true", message: `Success delete all the articles for the author => ${author}` })
}

const createNewAuthor = (req, res) => {
    const { firstName, lastName, age, country, email, password } = req.body
    const aut = new User({ firstName, lastName, age, country, email,password })
    aut.save().then(result => {res.status(201); res.json(result) }).catch(err => { res.send(err) })
}

app.get("/articles", getAllArticles);
app.get("/articles/search_1", getArticlesByAuthor);
app.get("/articles/search_2", getAnArticleById);
app.post("/articles", createNewArticle);
app.put("/articles/:id", updateAnArticleById);
app.delete("/articles/:id", deleteArticleById);
app.delete("/articles", deleteArticlesByAuthor);
app.post("/users", createNewAuthor);

app.listen(port, () => {
    console.log(`project_3 listening at http://localhost:${port}`);
});