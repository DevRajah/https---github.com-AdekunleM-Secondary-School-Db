require('./dbConfig/dbConfig')
const express = require('express');
require('dotenv').config();

const studentRouter = require('./router/router');

const app = express();

port = process.env.PORT

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the School System API");
})

app.use('/api/v1', studentRouter); 

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});