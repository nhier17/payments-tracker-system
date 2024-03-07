require('dotenv').config();
//express 
const express = require('express');
const app = express();

//db
const connectDB = require('./db/connect-db');

app.use(express.json());

app.get('/', (req,res )=> {
    res.send('Welcome to payments tracker')
});

const port = process.env.PORT || 8000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    };
    };

    start();