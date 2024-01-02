// imports
import e, { query } from 'express';
import express from 'express';
import pg from 'pg';

// global variables
const { Pool } = pg;
const app = express();
const expressPort = 8006;
const pool = new Pool ({
    user: 'matthewslonoff',
    password: 'slonoff4',
    host: 'localhost',
    database: 'dogdb',
    port: 5432,
});

// middleware
app.use(express.json());

// routes

// GET ALL OWNERS ROUTE GOOD
app.get('/api/owners', (req, res) => {
    pool
    .query('SELECT * FROM owners')
    .then((result) => res.status(201).send(result.rows))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

// GET ALL DOGS ROUTE GOOD
app.get('/api/dogs', (req, res) => {
    pool
    .query('SELECT * FROM dogs')
    .then((result) => res.status(201).send(result.rows))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

// GET OWNER BY ID GOOD
app.get('/api/owners/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM owners WHERE id=$1', [id])
    .then((result) => {
        console.log('result.rows:', result.rows);
        if (result.rows.length > 0) {
            res.status(200).send(result.rows)
        } else {
            res.status(404).send('Sorry cannot find owner');
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

// GET DOG BY ID GOOD
app.get('/api/dogs/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM dogs WHERE id=$1', [id])
    .then((result) => {
        console.log('result.rows:', result.rows);
        if (result.rows.length > 0) {
            res.status(200).send(result.rows)
        } else {
            res.status(404).send('Sorry cannot find dog');
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

// ADD OWNER GOOD
app.post('/api/owners', (req, res) => {
    const { firstname, lastname, address } = req.body;
    console.log(req.body);
    const queryParams = [firstname, lastname, address];
    console.log(queryParams);
    pool.query('INSERT INTO owners (firstname, lastname, address) VALUES($1, $2, $3)', queryParams)
    .then((result) => res.send('New Owner Added!'))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry cannot add new owner.');
    });
});

// ADD DOG GOOD
app.post('/api/dogs', (req, res) => {
    const { name, gender, ownerid } = req.body;
    console.log(req.body);
    const queryParams = [name, gender, ownerid];
    console.log(queryParams);
    pool.query('INSERT INTO dogs (name, gender, ownerid) VALUES($1, $2, $3)', queryParams)
    .then((result) => res.send('New Dog Added!'))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry cannot add new dog');
    });
});

// DELETE OWNER GOOD
app.delete('/api/owners/:id', (req, res) => {
    const { id } = req.params;
    pool
    .query('DELETE FROM owners WHERE id=$1 RETURNING *', [id])
    .then((result) => {
        if (result.rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.send('Owner Deleted!');
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

// DELETE DOG GOOD
app.delete('/api/dogs/:id', (req, res) => {
    const { id } = req.params;
    pool
    .query('DELETE FROM dogs WHERE id=$1 RETURNING *', [id])
    .then((result) => {
        if (result.rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.send('Dog Deleted!');
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});




// start server
app.listen(expressPort, () => {
console.log(`App listening on port: ${expressPort}...`)});