const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/albums.routes');
const app = express();

const PORT = process.env.PORT || 8081;

console.log('henlo! :3');

app.use(express.static('public'));
app.use(express.json()); 
app.use(morgan('tiny'));
app.use(cors());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
