const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const allRoutes = require('./Routes');

const app = express();
const PORT = 8000;

console.log('11111');

app.use(express.json());
app.use(cors());
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1', allRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('DB Connected');
    app.listen(PORT, () => {
      console.log(`Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err, 'ERROR');
  });
