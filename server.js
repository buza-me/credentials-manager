const express = require('express');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 8080;
const app = express();

app.get('*', async (req, res) => {
  const fileName = req.originalUrl?.split('/')?.reverse()?.[0] || 'index.html';
  const pathToFile = path.join(__dirname, 'dist', fileName);
  fs.access(pathToFile, fs.constants.F_OK, (err) => {
    if (!err) {
      res.sendFile(pathToFile);
    }
  });
});

app.listen(port, () => {
  console.log(`app started at port ${port}`);
});
