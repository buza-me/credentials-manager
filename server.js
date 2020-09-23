const express = require('express');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 8080;
const app = express();

app.get('*', (req, res) => {
  const fileNameFromUrl = req.originalUrl?.split('/')?.reverse()?.[0] || 'index.html';
  const fileName = /\.(?=\S+)/.test(fileNameFromUrl) ? fileNameFromUrl : 'index.html';
  const pathToFile = path.join(__dirname, 'dist', fileName);
  fs.access(pathToFile, fs.constants.F_OK, (err) => {
    console.log(err);
    if (!err) {
      res.sendFile(pathToFile);
    } else {
      res.send(null);
    }
  });
});

app.listen(port, () => {
  console.log(`app started at port ${port}`);
});
