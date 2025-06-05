import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This file is used by Render to start the server
import('./server.js').catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
