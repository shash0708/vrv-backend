const session = require('express-session');
const express = require('express');
const app = express();
const cors =require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config();
app.use(express.json())
app.use(cookieParser()); // Middleware to parse cookies
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors({
  origin: 'http://localhost:3000', // Frontend origin
  credentials: true, // Allow cookies
}));
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database Connected");
}).catch((e) => {
    console.log(e);
    console.log("Database Can't Be Connected");
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'User' }
  });
  
app.use(
  session({
    secret: process.env.Sec_Key,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Set to true when using HTTPS
      maxAge: 1000 * 60 * 60 // 1 hour (in milliseconds)
    }
  })
);

app.use('/api',require('./auth/Register'))

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
