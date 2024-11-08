const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Simulate a login by setting a cookie
app.get('/login', (req, res) => {
  res.cookie('auth', 'token123'); // Insecure auth cookie
  res.send('<h2>Logged in! Auth cookie set.</h2>');
});

// Form to transfer money (CSRF protection here)
app.get('/transfer',csrfProtection, (req, res) => {
  res.send(`
    <form method="POST" action="/transfer">
      <input type="text" name="amount" value="100">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <button type="submit">Transfer $100</button>
    </form>
  `);
});

// Process transfer ( CSRF protection)
app.post('/transfer',csrfProtection, (req, res) => {
  if (req.cookies.auth === 'token123') {
    res.send('<h2>Transfer Successful with CSRF Protection!</h2>');
  } else {
    res.send('<h2>Unauthorized</h2>');
  }
});

//Error handling middleware for CSRF token errors
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.status(403); // Forbidden
        return res.send('Invalid CSRF token. It may be a CSRF attack.');
      }
      next(err); // Pass other errors to default error handler
  
});

app.listen(port, () => {
  console.log(`Vulnerable app running at http://localhost:${port}`);
});
