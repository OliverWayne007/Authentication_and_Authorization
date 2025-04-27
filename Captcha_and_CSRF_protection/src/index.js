import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();

app.use( session( {
    secret: process.env.SESSION_SECRET , 
    resave: false , 
    saveUninitialized: true , 
    cookie: { maxAge: 180000 , httpOnly: true }
} ) );

app.use(express.json());
app.use(express.urlencoded( { extended: true } ) );
app.use(express.text());

app.use(cookieParser());

app.use("/auth" , authRouter);

// Using IIFE to connect to DB and start the server
(async () => {
    try 
    {
        const PORT = process.env.PORT || 3000;
        const MONGO_URI = process.env.MONGO_URI;

        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to DB");

        app.listen(PORT , () => {
            console.log(`Server started....`);
            console.log(`Server running on port: ${PORT}`);
        });
    } 
    catch (error) 
    {
        console.log("Failed to start the server" , error);
        process.exit(1);
    }
})();