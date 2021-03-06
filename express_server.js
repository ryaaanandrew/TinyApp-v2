const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xK": "http://www.google.com"
};

// <-- HELPER FUNCTIONS -->

function generateRandomString() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// <-- GET -->
app.get('/', (req, res) => {
    res.send('Hello!');
});

app.get('/urls.json', (req, res) => {
    res.json(urlDatabase)
});

app.get('/urls', (req, res) => {
    const templateVars = { urls: urlDatabase }
    res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
    res.render('urls_new');
});

app.get('/urls/:shortURL', (req, res) => {
    const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] }
    res.render('urls_show', templateVars);
});

app.get('/u/:shortURL', (req, res) => {
    const longURL = urlDatabase[req.params.shortURL];
    res.redirect("http://" + longURL);
});

// <-- POST -->
app.post("/urls", (req, res) => {
    let shortURL = generateRandomString();
    urlDatabase[shortURL] = req.body.longURL;
    res.status(200).redirect(`urls/${shortURL}`);
});

app.listen(PORT, () => {
    console.log(`Example app listening on ${PORT}`);
});

