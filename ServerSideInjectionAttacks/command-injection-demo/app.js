const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Whitelist of valid filenames
const validFilenames = ['example.txt', 'test.txt'];

app.get('/read-file', (req, res) => {
    const filename = req.query.filename;

    // Validate the filename against the whitelist
    if (!validFilenames.includes(filename)) {
        return res.status(400).send('Invalid filename provided.');
    }

    // Construct the full path
    const filePath = path.join(__dirname, 'files', filename);

    // Read the file directly
    fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
            console.error('File reading error:', error.message);
            return res.status(500).send('File reading error');
        }
        res.send(`File Content:\n${data}`);
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

