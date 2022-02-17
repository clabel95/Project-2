const express = require('express');
const exphbs = require('express-handlebars');
// const session = require('express-session');
const hbs = exphbs.create({});
const path = require('path');

// const session = require('express-session');
// const exphbs = require('express-handlebars');

const routes = require('./controllers');
// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// const sess = {
//     secret: 'secrets',
//     resave: false,
//     saveUninitialized: true,
// };

// app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

// creates middleware > methods/functions/operations that are called between req, res
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



app.use(routes);

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
});







// Graveyard:
// app.get('/', (req,res) => {res.render('main', {layout : 'index'});
// });
// } res.send('Hello World !'));

// const sess = {
//     secret: 'secrets',
//     resave: false,
//     saveUninitialized: true,
// };

// app.use(session(sess));

// const hbs = exphbs.create({ helpers });

// creates middleware > methods/functions/operations that are called between req, res
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// need to set up routes in controllers and api folder
// app.use(routes);