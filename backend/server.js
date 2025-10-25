const express = require('express'); 
const myApp = express();
const port = 3000;

myApp.get('/', (req, res) => {
  res.send('Hello World!');
}); 

myApp.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});