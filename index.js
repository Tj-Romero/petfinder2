const pets = require('./data');

const express = require('express');
const app = express();

const PORT = 4000;

// Serve the static files from the "public" directory
app.use(express.static('public'));


// GET - / - returns homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    res.json(pets); 
});

// get pet by owner with query string
app.get("/api/v1/pets/:owner", (req, res) =>{
const owner = req.query.owner;
    res.send(`Hello My name Is: ${req.query.owner}`);
    
    // find the pet in the pets array
    const pet = pets.find((pet) => pet.owner === owner);
    
    // send the pet as a response 
    res.json (pet) ;
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    const name = req.params.name; 

    const pet = pets.find(pet => pet.name === name);
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send('Pet not found');
    }
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;
