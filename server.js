const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const router = require('./route/route');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 


app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server connected to DB and listening on port: ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
