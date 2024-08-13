const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const port = 5000;
const app = express();

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
    cb(null, req.headers['image-id']); // Use image-id from headers
  }
});

const upload = multer({ storage });

// Handle image upload
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Parse the product from headers
    let product = JSON.parse(req.headers['product']);
    product['imageId'] = req.headers['image-id'];    

    // Make a PUT request to the API
    const response = await fetch('http://localhost:8080/api/products/'+product['id'], {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',     
      },
      body: JSON.stringify(product)
    });

    // Check response status
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with status ${response.status}: ${errorText}`);
    }

    const responseData = await response.json();
    console.log("API Response:", responseData);

    res.json({ message: 'File uploaded and product updated successfully', filename: req.file.filename });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: 'Failed to upload and update product', error: error.message });
  }
});

// Serve static files (images) from the 'public/productImages' directory
app.use('/productImages', express.static(path.join('public', 'productImages')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
