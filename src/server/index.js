import express from "express"
import cors from "cors"
import { renderToString } from "react-dom/server"
import App from '../shared/App'
import React from 'react'
import serialize from "serialize-javascript"
import path from 'path';
import fs from 'fs';
import { StaticRouter, matchPath } from 'react-router-dom';
import Routes from '../shared/routes'

const app = express();

app.use(cors());

app.use(express.static("public"));

app.get("*", (req, res) => {
    const currentRoute =
        Routes.find(route => matchPath(req.url, route)) || {};
    let promise;

    if (currentRoute.loadData) {
        promise = currentRoute.loadData();
    } else {
        promise = Promise.resolve(null);
    }

    promise.then(data => {
                const context = {data};

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
