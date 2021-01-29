const express = require('express');
const path = require('path');
const pool = require('../db/queries.js');
const bodyParser = require('body-parser');
const PORT = 2000;

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// get all alarms
app.get('/api/alarms', (request, response) => {
    var queryString = `SELECT * FROM alarms`;
    pool
        .query(queryString)
        .then(res => {
            response.send(res.rows);
        })
        .catch(err => {
            response.send(err.stack);
        });
});

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});