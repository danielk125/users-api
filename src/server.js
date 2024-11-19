const express = require("express");
const cors = require('cors');
const Pool = require("pg").Pool;
const Query = require("pg").Query;
require("pg").Query;
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl : {
        rejectUnauthorized : false
    }
});

app.get("/", (req, res) => {
    res.json({message: "hello world!"});
});

app.get("/users", async (req, res) => {
    const query = "SELECT * FROM users;"
    try {
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error("Query error: ", err)
        res.status(500);
    }

});

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});