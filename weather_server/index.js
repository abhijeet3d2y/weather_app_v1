// import libraries from npm
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// import files
import logs from './log4js.js';
import route from './routes/route.js';

// import constant variables from .env file
const PORT = process.env.PORT || 4001;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

//connect to MONGODB Database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
    console.log('Mongo connection error: ', err);
});
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    logger.info("Connected to MongoDB !")
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
global.logger = logs.getLogger();

app.use('/', route);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    logger.info("Connection is Successful on Port - ", PORT);
});