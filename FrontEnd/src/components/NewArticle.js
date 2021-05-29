import React, { useState } from 'react';
import axios from "axios";

const NewArticle = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);
    const [statusF, setStatusf] = useState(false);


    const newArticleF = () => {
        const art = { title: title, description: description };
        axios
            .post("http://localhost:5000/articles", art, {
                headers: { 'Authorization': props.nToken }
            })
            .then((response) => {
                if (!response.data.errors) {
                    response.status(201)
                    setStatus(true)
                }
            })
            .catch((err) => {
                setStatusf(true)
                console.log(err);

            })
    }
    return (
        <>
            <div className="newStyle">
                <input className="inputStyle" type="text" placeholder="article title here" onChange={(e) => {
                    setTitle(e.target.value);
                }} /><br />
                <textarea className="areaStyle" placeholder="Description here" onChange={(e) => {
                    setDescription(e.target.value)
                }}></textarea> <br />
                <button className="registerButton" onClick={newArticleF}>Create New Article</button>
                <div>
                    {status ? <p className="successMessage">The article has been created successfully</p>
                        : ""}
                    {statusF ? <p className="failMessage">Error happened while creating a new article, please try again </p>
                        : ""}
                </div>
            </div>
        </>
    )
}

export default NewArticle