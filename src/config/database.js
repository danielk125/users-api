const { Pool } = require("pg").Pool;
const dotenv = require("dotenv");

dotenv.config();

if(!process.env.DATABASE_URL){
    throw new error("DATABASE_URL is required")
}

export const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl : {
        rejectUnauthorized : false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});