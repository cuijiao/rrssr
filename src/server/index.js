import express from "express"
import cors from "cors"
import { renderToString } from "react-dom/server"
import React from 'react'
import path from 'path';
import fs from 'fs';
import { match, RouterContext } from 'react-router'
import routes from '../shared/newRoutes'
import ReactDOMServer from 'react-dom/server';

const app = express();

app.use(cors());

app.use(express.static("public"));

app.get('*', (req, res) => {
    // match the routes to the url
    match({ routes, location: req.url }, (err, redirect, props) => {
        const appHtml = ReactDOMServer.renderToString(<RouterContext {...props}/>)
        const indexFile = path.resolve('./src/index.html');
        return fs.readFile(indexFile, 'utf8', (err, indexData) => {
            return res.send(
                indexData
                    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
                    .replace('</head>', `<link rel="shortcut icon" href="/favicon.ico"></head>`)
                    .replace(
                        '</body>',
                        `<script src='/bundle.js' defer></script></body>`
                    )
            );
        });
    })
});

app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`);
});
