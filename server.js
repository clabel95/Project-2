const express = require('express');
const {engine} = require('express-handlebars');
const session = require('express-session');
// const hbs = exphbs.create({});
const path = require('path');

// const session = require('express-session');
// const exphbs = require('express-handlebars');

const routes = require('./controllers');
// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static(path.join(__dirname, 'public')));
}

const sess = {
    secret: 'secrets',
    resave: false,
    saveUninitialized: true,
};

app.use(session(sess));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));



if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('public'));
}
app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
});


// creates middleware > methods/functions/operations that are called between req, res
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



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