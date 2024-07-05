const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine" , "ejs");
// Define the path to the certificate files
const keyPath = 'server.key';
const certPath = 'server.crt';

// Check if the certificate files exist
if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error('Certificate files not found. Please check the paths.');
  process.exit(1);
}

// Read the certificate files
const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};

// Set up a simple route
app.get("/", (req, res) => {
  res.render('index');
});

// Create and start the HTTPS server
https.createServer(options, app).listen(5500, '0.0.0.0', () => {
    console.log('HTTPS server running on port 5500');
  });

// Add error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
