const express = require('express');
const app = express();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');



mongoose.connect('mongodb://localhost:27017/UsernamePassowrds', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'passwordnotstrong' }))

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/public/index')
    }
    next();
}
app.get('/', (req, res) => {
    res.send('Registered and password saved. You can login with your username and password')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({ username, password:hash })
    await user.save();
    res.send("Password was encrypted and stored to database")
    req.session.user_id = user._id;
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/public/about.ejs');
    }
    else {
        res.redirect('/login')
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    // req.session.destroy();
    res.redirect('/login');
})

app.get('/loginSuccess', requireLogin, (req, res) => {
    res.render('loginSuccess')
})


app.listen(3000, () => {
    console.log("NOW SERVING")
})
