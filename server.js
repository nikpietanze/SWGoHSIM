// Defines Express and sets it as a requirement
const express = require('express');

// Assigns express to the variable 'app'
const app = express();

// This sets the link extension for the API call and the data it will respond with.
app.get('/api/profiles', (req, res) => {

  // This would be replaced with a database like MongoDB or SQL
  const profiles = [
    {
      id: 1,
      firstName: 'Nik',
      lastName: 'Pietanze'
    },
    {
      id: 2,
      firstName: 'Jerry',
      lastName: 'Hartsough'
    }
  ];

  // This tells the API what to respond with, in this case it's our json data of the customer list
  res.json(profiles);
})

// Assigns a port for our server to run on
const port = 5000;

// Tells express to listen on the port we assigned in the above variable and displays a message in the console
app.listen(port, () => console.log(`Server started on port ${port}`));