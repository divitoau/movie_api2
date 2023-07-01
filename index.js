const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  fs = require("fs"),
  path = require("path"),
  mongoose = require("mongoose"),
  Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://127.0.0.1:27017/cfDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get specific user by username
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
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
}     */
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//update user info by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put("/users/:username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }
  )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//add movie to favorites
app.post("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }
  )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//remove movie from favorites
app.delete("/users/:id/favorites/:title", (req, res) => {
  res.send(req.params.title + " has been removed from favorites");
});

//deregister user
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});
