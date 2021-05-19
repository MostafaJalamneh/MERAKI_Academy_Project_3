const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const salt = 10;

const users = new mongoose.Schema({
    firstName: { type: String }, lastName: { type: String },
    age: { type: Number }, country: { type: String }, email: { type: String, required: true, unique: true }, password: { type: String },
    role:{type: mongoose.Schema.ObjectId, ref: "Roles"}
})
const articles = new mongoose.Schema({
    title: { type: String }, description: { type: String },
    author: { type: mongoose.Schema.ObjectId, ref: "User" }
})
const comment = new mongoose.Schema({
    comment: { type: String },
    commenter: { type: mongoose.Schema.ObjectId, ref: "User" },
});
const roles = new mongoose.Schema({
    role: { type: String },
    permissions: [{}]
})

users.pre("save", async function () {
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model("User", users);
const Articles = mongoose.model("Articles", articles);
const Comment = mongoose.model("Comment", comment);
const Roles = mongoose.model("Roles", roles);

module.exports.User = User;
module.exports.Articles = Articles;
module.exports.Comment = Comment;
module.exports.Roles = Roles;