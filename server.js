// Set up express
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers')
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/date-format');
const hbs = exphbs.create({ helpers });
// Create session storage
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'eitnaohe',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
// create app instance
const app = express();
const PORT = process.env.PORT || 3001;
// express middleware for JSON decoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// make css and js public files available
app.use(express.static(path.join(__dirname, 'public')));
// session storage
app.use(session(sess));
// Turn on routes
app.use(routes);
// Set up handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// turn on server and DB connection
sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log('Now listening'))
    })