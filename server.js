const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
            console.log('Не удалось записать логи в файл');
    });
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'welcome!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({error: 'Address is required.'});

    geocode(req.query.address, (errorMessage, results) => {
        if (errorMessage)
            res.send({error: errorMessage});
        else {
            weather(results.Latitude, results.Longitude, (errorMessage, weatherResults) => {
                if (errorMessage)
                    res.send(errorMessage);
                else {
                    res.send({
                        forecast: weatherResults,
                        location: results.Address
                    });
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});