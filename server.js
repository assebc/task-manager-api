const app = require('./src/app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
