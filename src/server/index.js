import express from "express"
import cors from "cors"
import { renderToString } from "react-dom/server"
import App from '../shared/App'
import React from 'react'
import fetchPopularRepos from '../shared/api'
import serialize from "serialize-javascript"
import path from 'path';
import fs from 'fs';
import { StaticRouter } from 'react-router-dom';

const app = express();

app.use(cors());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"));

app.get("*", (req, res) => {
    const context = {};
    fetchPopularRepos()
        .then(
            (data) => {
                const markup = renderToString(
                    <StaticRouter location={req.url} context={context}>
                        <App data={data}/>
                    </StaticRouter>
                )

                const indexFile = path.resolve('./src/index.html');
                fs.readFile(indexFile, 'utf8', (err, indexData) => {
                    return res.send(
                        indexData
                            .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
                            .replace(
                                '</body>',
                                `<script>window.__INITIAL_DATA__ = ${serialize(data)}</script><script src='/bundle.js' defer></script></body>`
                            )
                    );
                });
            })
});

app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`);
});
