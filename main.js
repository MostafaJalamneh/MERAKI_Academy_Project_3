const express = require("express");
const app = express();
const port = 5000;

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

app.get("/articles", (req, res) => {
    res.status(200);
    res.json(articles);
})

app.get("/articles/search_1", (req, res) => {
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
})


app.get("/articles/:id", (req, res) => {
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
});


app.listen(port, () => {
    console.log(`project_3 listening at http://localhost:${port}`);
});