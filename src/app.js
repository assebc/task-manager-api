const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const setupSwagger = require('./swagger');

const app = express();

app.use(cors()); 
app.use(express.json()); 

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((_, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
