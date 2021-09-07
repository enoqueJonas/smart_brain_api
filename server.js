const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signIn = require('./controllers/signIn');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'smart_brain'
    }
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users)
})

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.post('/signin',  (req, res) => { signIn.handleSignIn(req, res, bcrypt, db) })

app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, db) });

app.listen(3000, () => {

})