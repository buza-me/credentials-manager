const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/ping', (req, res) => res.send('pong'));

app.get('*', (req, res) => {
  const pathname = path.join(__dirname, 'dist', 'index.html');
  console.log(pathname);
  res.sendFile(pathname);
});

app.listen(port, () => {
  console.log(`app started at port ${port}`);
});
