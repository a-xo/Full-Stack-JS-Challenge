console.log('henlo :3');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json()); // Used to parse JSON bodies
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(cors()); // If I want the server to be hosted on a different domain

const PORT = process.env.PORT || 8081;

app.get('/status', (req, res) => {
    res.send({
        message: 'henlo from the status request!'
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });