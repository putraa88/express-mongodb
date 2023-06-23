require('dotenv').config();
require('./config/mongoose');
const express = require('express');
const app = express();
const port = parseInt(process.env.PORT) || 8080;
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', require('./routes'));
app.use(require('./middlewares/error-handler.middleware'));

app.listen(port, () => console.log(`Server running on port: ${port}`));