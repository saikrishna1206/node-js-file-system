const express = require('express');
const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon'); // Luxon library for date and time manipulation

const app = express();
const port = 3000;

app.use(express.json());

app.post('/create_text_file', (req, res) => {
  const { folder } = req.body;

  if (!folder) {
    return res.status(400).json({ error: 'Folder not specified in the request body.' });
  }

  const currentDate = DateTime.local().toFormat('yyyy-MM-dd_HH-mm-ss');
  const filename = `${currentDate}.txt`;
  const filePath = path.join(folder, filename);
  const fileContent = `${DateTime.local().toISO()}\n`;

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating the text file.' });
    }

    return res.status(200).json({ message: `Text file ${filename} created in ${folder}.` });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});