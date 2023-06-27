const express = require('express'),
    morgan = require('morgan');
    
const app = express();

let topMovies = [
  {
    title: "Sucker Punch",
    director: "Zack Snyder",
    year: 2011,
  },
  {
    title: "Mad Max: Fury Road",
    director: "George Miller",
    year: 2015,
  },
  {
    title: "Blade Runner 2049",
    director: "Denis Villeneuve",
    year: 2017,
  },
  {
    title: "Repo! The Genetic Opera",
    director: "Darren Lynn Bousman",
    year: 2008,
  },
  {
    title: "Pirates of the Caribbean: The Curse of the Black Pearl",
    director: "Gore Verbinski",
    year: 2003,
  },
  {
    title: "1917",
    director: "Sam Mendes",
    year: 2019,
  },
  {
    title: "Star Wars: Episode III - Revenge of the Sith",
    director: "George Lucas",
    year: 2005,
  },
  {
    title: "Futurama: Into the Wild Green Yonder",
    director: "Peter Avanzino",
    year: 2009,
  },
  {
    title: "Tropic Thunder",
    director: "Ben Stiller",
    year: 2008,
  },
  {
    title: "Hot Fuzz",
    director: "Edgar Wright",
    year: 2007,
  },
];

app.use(morgan('common'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Howdy, I hope you like movies!');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080')
});