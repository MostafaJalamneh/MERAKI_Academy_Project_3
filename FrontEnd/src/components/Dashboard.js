import React, { useState, useEffec } from 'react';
import axios from "axios";

const Dashboard = () => {
    const [articles, setArticles] = useState("");

    const getArticles = () => {
        axios
            .get("http://localhost:5000/articles")
            .then((response) => {
                setArticles(response.data)
            })
            .catch((err) => {
                console.log(err);
            })

        useEffect(() => {

            getArticles();
        }, []);
    }
    return (
        <>
            <p>Dashboard:</p>
            <button onClick="getArticles">Get All Articles</button>
        </>
    )
}

export default Dashboard