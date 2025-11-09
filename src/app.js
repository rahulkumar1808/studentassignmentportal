const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key', // Replace with a secure key
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // Session expires in 1 minute
}));


app.get('/', (req, res) => {
  if (req.session.username) {
    res.send(`
      <h2>Welcome back, ${req.session.username}!</h2>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send(`
      <form method="POST" action="/login">
        <input type="text" name="username" placeholder="Enter username" required />
        <button type="submit">Login</button>
      </form>
    `);
  }
});


app.post('/login', (req, res) => {
  const { username } = req.body;
  if (username) {
    req.session.username = username;
    res.redirect('/');
  } else {
    res.send('Login failed. Please provide a username.');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.username) {
    res.send(`<h2>Hello ${req.session.username}, this is your dashboard.</h2>`);
  } else {
    res.redirect('/');
  }
});


app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out.');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});