const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  fs = require("fs"),
  path = require("path"),
  mongoose = require('mongoose'),
  Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.Users;

mongoose.connect('nogodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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

//user list
let users = [
  {
    id: "uvwxyz",
    name: "Austin DiVito",
    username: "CoolDude475",
  },
];

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
app.get("/movies/:title/:director", (req, res) => {
  res.send("a json object of a director");
});

//register new user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }).then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//update username by id
app.put("/users/:id/:username", (req, res) => {
  let user = users.find((user) => {
    return user.id === req.params.id;
  });

  if (user) {
    user.username = req.params.username;
    res.status(201).send("username updated to " + user.username);
  } else {
    res.status(404).send("no user found by id: " + req.params.id);
  }
});

//add movie to favorites
app.post("/users/:id/favorites/:title", (req, res) => {
  res.send(req.params.title + " has been added to favorites");
});

//remove movie from favorites
app.delete("/users/:id/favorites/:title", (req, res) => {
  res.send(req.params.title + " has been removed from favorites");
});

//deregister user
app.delete("/users/:username/", (req, res) => {
  let user = users.find((user) => {
    return user.username === req.params.username;
  });

  if (user) {
    res.status(201).send("user " + user.username + " has been deregistered");
  } else {
    res.status(404).send("no user found by username: " + req.params.username);
  }
});

//error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});
