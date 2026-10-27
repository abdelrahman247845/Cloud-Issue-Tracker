require('dotenv').config({ quiet: true });

const express = require('express');
const issueRoutes = require('./routes/issues');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Log every request
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// Parse JSON and mount routes (order matters)
app.use(express.json());
app.use('/api/issues', issueRoutes);

// Route not found
app.use((req, res) => {
  res.status(404).json({
    error: { code: 'ROUTE_NOT_FOUND', message: 'Route not found.' }
  });
});

// Central error handler (needs all 4 parameters)
app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'Request body is not valid JSON.' }
    });
  }

  console.error(error);
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'An unexpected server error occurred.' }
  });
});

app.listen(PORT, () => {
  const env = process.env.NODE_ENV || 'development';
  console.log(`Cloud Issue API listening on http://localhost:${PORT} (${env})`);
});