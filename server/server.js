const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/albums.routes');
const app = express();

const PORT = process.env.PORT || 8081;

console.log('henlo! :3');

app.use(express.static('public'));
app.use(express.json()); // Used to parse JSON bodies
app.use(morgan('tiny'));
app.use(cors()); // If I want the server to be hosted on a different domain
app.use('/api', routes);

// app.get('/', (req, res) => {
//   res.send({
//     message: "henlo! alt ist gut!",
//   });
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
