const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

//movie list

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

let users = [];

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));

//home page
app.get("/", (req, res) => {
  res.send("Howdy, I hope you like movies!");
});

//get all movies
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

//get all users
app.get("/users", (req, res) => {
  res.json(users);
});

//get movie data by title
app.get("/movies/:title", (req, res) => {
  res.json(
    topMovies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

//get genre description
app.get("/movies/:title/genre", (req, res) => {
  res.send("a description of a genre");
});

//get director data
app.get("/movies/:title/director", (req, res) => {
  res.send("a json object of a director");
});

//register new user
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "name is required";
    res.status(400).send(message);
  } else if (!newUser.username) {
    const message = "username is required";
    res.status(400).send(message);
  } else {    
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser); //should 'send, be 'json' instead?
  }
}
);

//update username by id
app.put('/users/:id/:username', (req, res) => {
  let user = users.find((user) => {
    return user.id === req.params.id;
  });

  if (user) {
    user.username = req.params.username
    res
      .status(201)
      .send('username updated to ' + user.username);
  } else {
    res.status(404).send('no user found by id: ' + req.params.id);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});
