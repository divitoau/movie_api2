An API to communicate with a movie information database. Developed through the MERN stack

|Business Logic|URL|HTTP Method|Request body data format|Response body data format|
| -------------|---|-----------|------------------------|-------------------------|
|Get list of all movies|/movies|GET|none|An array holding JSON objects of all movie titles|
|Get movie data by title|/movies/[Title]|GET|none|A JSON object holding data about a single movie structured like:{ 
"Genre": {}, 
"Director": {}, 
"Actors": [], 
"_id": "xxxxxxxxxxxxxxxxxxxxxxxx", 
"Title": "Sucker Punch", 
"Description": "[description]", 
"ImagePath": "[image URL]", 
"Featured": boolean
}|
|Get genre description by name|/movies/[Title]/genre|GET|none|A JSON object structured like: { 
"Genre": { 
"Name": "[genre name]", 
"Description": "[genre description]" 
}}|
|Get director data by name|/movies/[Title]/director|GET|none|A JSON object structured like: { 
"Director": { 
"Name": "[director name]", 
"Bio": "[director bio]" 
"Birth": "[director birth year]" 
"Death": "[director death year]" 
}}|
|Register new user|/users|POST|A JSON object structured like: 
{ 
"Username": "CoolDude475", 
"Password": "CoolPassword89", 
"Email": "cooldude475@gmail.com", 
"Birthday": "yyyy-mm-dd" 
}
|A JSON object structured like: 
{ 
"Username": "CoolDude475", 
"Password": "CoolPassword89", 
"Email": "cooldude475@gmail.com", 
"Birthday": "yyyy-mm-dd", 
"FavoriteMovies": [], 
"_id": "xxxxxxxxxxxxxxxxxxxxxxxx", 
"__v": 0 
}|
|Update user info|/users/[username]|PUT|A JSON object structured like: 
{ 
"Username": "newUsername", 
"Password": "newPassword", 
"Email": "newEmail@gmail.com", 
"Birthday": "yyyy-mm-dd"
}
|A JSON object structured like: 
{ 
"_id": "xxxxxxxxxxxxxxxxxxxxxxxx", 
"Username": "newUsername", 
"Password": "newPassword", 
"Email": "newEmail@gmail.com", 
"Birthday": "yyyy-mm-dd", 
"FavoriteMovies": [], 
"__v": 0 
}|
|Add movie to favorites list|/users/[Username]/movies/[MovieID]|POST|none|A JSON object structured like: 
{ 
"_id": "xxxxxxxxxxxxxxxxxxxxxxxx", 
"Username": "CoolDude475", 
"Password": "CoolPassword89", 
"Email": "cooldude475@gmail.com", 
"Birthday": "yyyy-mm-dd", 
"FavoriteMovies": [updated array], 
"__v": 0 
}|
|Remove movie from favorites list|/users/[Username]/movies/[MovieID]|DELETE|none|A JSON object structured like: 
{ 
"_id": "xxxxxxxxxxxxxxxxxxxxxxxx", 
"Username": "CoolDude475", 
"Password": "CoolPassword89", 
"Email": "cooldude475@gmail.com", 
"Birthday": "yyyy-mm-dd", 
"FavoriteMovies": [updated array], 
"__v": 0 
}|
|Deregister user|/users/[Username]|DELETE|none|A text message reading: "[Username] was deregistered"|