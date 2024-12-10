require("dotenv").config();

const dev = {
    port: process.env.PORT || 4000,
    dbUrl: process.env.DB_URL
}

module.exports = dev;
