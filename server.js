const fs = require('fs').promises;
const exists = require('fs').exists;
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/feedback', express.static('feedback'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'feedback.html');
  res.sendFile(filePath);
});

app.get('/exists', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'exists.html');
  res.sendFile(filePath);
});

app.post('/create', async (req, res) => {
  const title = req.body.title;
  const content = req.body.text;
  const adjTitle = title.toLowerCase();

  const tempFilePath = path.join(__dirname, 'temp', adjTitle + '.txt');
  const finalFilePath = path.join(__dirname, 'feedback', adjTitle + '.txt');

  console.log("TEST !!!!")

  try {
    // Write content to the temporary file
    await fs.writeFile(tempFilePath, content);

    try {
      // Check if the final file already exists
      await fs.access(finalFilePath);
      // If the file exists, redirect to /exists
      res.redirect('/exists');
    } catch (err) {
      // If the file does not exist, proceed to copy the temp file
      if (err.code === 'ENOENT') {
        await fs.copyFile(tempFilePath, finalFilePath);
        await fs.unlink(tempFilePath);
        res.redirect('/');
      } else {
        // Handle other errors (optional)
        throw err;
      }
    }
  } catch (err) {
    // Handle file system errors
    res.status(500).send('Internal server error occured');
  }
});

app.listen(80);
