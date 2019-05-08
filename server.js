/*const http = require('http');*/
const express = require('express');
const app = express();
const bodyParser =  require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
const database = {
    users: [
        {id: '123', name: 'john', email: 'john@gmail.com', password: 'cookies', entries: 0, joined: new Date()},
        {id: '124', name: 'sally', email: 'sally@gmail.com', password: 'bananas', entries: 0, joined: new Date()}
    ],
    login: [
        {id: '987', hash: '', email: 'john@gmail.com'} 
    ]
}

app.listen('3000', () => {
    console.log('smart brain is running on port 3000');
});

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password
        ){
            res.json('success');
        }else{
            res.status(400).json("error loggin in");
        }
});

app.post('/register', (req, res) => {
    const {email, name, password} = req.body
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach( user => {
        if(user.id === id){
            found = true
           return res.json(user);
        }
    });
    if(!found){
        res.status(400).json('not found');
    }
});

/*
/ --> res  = this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT  = user

*/

app.post('/image', (req, res) =>{
    const { id } = req.body;
    let found = false;
    database.users.forEach( user => {
        if(user.id === id){
            found = true
            user.entries++;
           return res.json(user.entries);
        }
    });
    if(!found){
        res.status(400).json('not found');
    }
});

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
//     console.log(hash);
// });
const hash = '$2a$10$3RWY5wDm9VNeClm1vIGFDOn9hbYfVBPFFqe8x.GrWvA.COZRmkijm';
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
    console.log(res);
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
    console.log(res);
});

