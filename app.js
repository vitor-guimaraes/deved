const express = require ('express');
const app = express ();
const mongoose = require ('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');

//MIDDLEWARE
app.use(bodyParser.json());

const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute)


//ROUTES
app.get('/', (req, res) => {
    res.send('HOMEPAGE');
});

//CONNECT DO DB
mongoose.connect(process.env.DB_CONNECTION, () => console.log ('connected to db'));

app.listen(3000);
