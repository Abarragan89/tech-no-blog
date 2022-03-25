// Set up express
const express = require('express');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes')

// express middleware for JSON decoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(routes);

// turn on server and DB connection
sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log('Now listening'))
    })