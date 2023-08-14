const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require("./config/db")
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
connectDB();

const app = express();

app.use(cors());
app.use(express.json())
app.use(morgan('dev'));

// app.use('/api/v1/users', userRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server running ${process.env.DEV_MOD} mode on port ${PORT}`.bgCyan.white);
});
