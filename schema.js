const mongoose = require("mongoose");

const users = new mongoose.Schema({
    firstName: { type: String }, lastName: { type: String },
    age: { type: Number }, country: { type: String }, email: { type: String, required: true, unique: true }, password: { type: String }
})
const articles = new mongoose.Schema({
    title: { type: String }, description: { type: String },
    author: { type: mongoose.Schema.ObjectId, ref: "User" }
})
const comment = new mongoose.Schema({
    comment: { type: String },
    commenter: { type: mongoose.Schema.ObjectId, ref: "User" },
});

users.pre("save", async function () {
    this.email = this.email.toLowerCase();
    bcrypt.hash(this.password, salt, (err, hash) => {
        this.isModified("password")
    });
});

const User = mongoose.model("User", users);
const Articles = mongoose.model("Articles", articles);
const Comment = mongoose.model("Comment", comment);
module.exports.User = User;
module.exports.Articles = Articles;
module.exports.Comment = Comment;