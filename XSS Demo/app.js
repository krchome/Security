const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Render a form that is vulnerable to XSS
app.get('/', (req, res) => {
  res.send(`
    <h2>Submit a comment (XSS Vulnerable)</h2>
    <form method="POST" action="/comment">
      <textarea name="comment" rows="4" cols="50"></textarea><br>
      <button type="submit">Submit Comment</button>
    </form>
  `);
});
const sanitizeHtml = require('sanitize-html');
// Vulnerable endpoint to render comments without sanitizing input
app.post('/comment', (req, res) => {
  const userComment = sanitizeHtml(req.body.comment);
  
  // Render the comment directly without sanitization (XSS vulnerability)
  res.send(`
    <h2>Your Comment:</h2>
    <p>${userComment}</p>
    <a href="/">Submit another comment</a>
  `);
});

app.listen(port, () => {
  console.log(`Vulnerable app running at http://localhost:${port}`);
});
