const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join('public', 'productImages');
    fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it doesn't exist
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original filename
  }
});

const upload = multer({ storage });

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

// Serve static files (images) from the 'public/productImages' directory
app.use('/productImages', express.static(path.join('public', 'productImages')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});