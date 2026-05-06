import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Serve static files from the same directory (since both server.js and client files are in dist/)
app.use(express.static(__dirname));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving static files from: ${__dirname}`);
});
