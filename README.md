An API to communicate with a movie information database. Developed through the MERN stack

|Business Logic|URL|HTTP Method|Request body data format|Response body data format|
| -------------|---|-----------|------------------------|-------------------------|
|Get list of all movies|/movies|GET|none|An array holding JSON objects of all movie titles|
|Get movie data by title|/movies/[Title]|GET|none|
A JSON object holding data about a single movie structured like:
<br />{ <br />"Genre": {}, <br />"Director": {}, <br />"Actors": [], <br />"_id": "xxxxxxxxxxxxxxxxxxxxxxxx", <br />"Title": "Sucker Punch", <br />"Description": "[description]", <br />"ImagePath": "[image URL]", <br />"Featured": boolean <br />}|
|Get genre description by name|/movies/[Title]/genre|GET|none|A JSON object structured like: <br />{ <br />"Genre": { <br />"Name": "[genre name]", <br />"Description": "[genre description]" <br />}}|
|Get director data by name|/movies/[Title]/director|GET|none|A JSON object structured like: <br />{ <br />"Director": { <br />"Name": "[director name]", <br />"Bio": "[director bio]" <br />"Birth": "[director birth year]" <br />"Death": "[director death year]" <br />}}|
|Register new user|/users|POST|
A JSON object structured like: <br />{ <br />"Username": "CoolDude475", <br />"Password": "CoolPassword89", <br />"Email": "cooldude475@gmail.com", <br />"Birthday": "yyyy-mm-dd" <br />}|
A JSON object structured like: <br />{ <br />"Username": "CoolDude475", <br />"Password": "CoolPassword89", <br />"Email": "cooldude475@gmail.com", <br />"Birthday": "yyyy-mm-dd", <br />"FavoriteMovies": [], <br />"_id": "xxxxxxxxxxxxxxxxxxxxxxxx", <br />"__v": 0 <br />}|
|Update user info|/users/[username]|PUT|
A JSON object structured like: <br />{ <br />"Username": "newUsername", <br />"Password": "newPassword", <br />"Email": "newEmail@gmail.com", <br />"Birthday": "yyyy-mm-dd" <br />}|
A JSON object structured like: <br />
{ <br />"_id": "xxxxxxxxxxxxxxxxxxxxxxxx", <br />"Username": "newUsername", <br />"Password": "newPassword", <br />"Email": "newEmail@gmail.com", <br />"Birthday": "yyyy-mm-dd", <br />"FavoriteMovies": [], <br />"__v": 0 <br />}|
|Add movie to favorites list|/users/[Username]/movies/[MovieID]|POST|none|
A JSON object structured like: <br />
{ <br />"_id": "xxxxxxxxxxxxxxxxxxxxxxxx", <br />"Username": "CoolDude475", <br />"Password": "CoolPassword89", <br />"Email": "cooldude475@gmail.com", <br />"Birthday": "yyyy-mm-dd", <br />"FavoriteMovies": [updated array], <br />"__v": 0 <br />}|
|Remove movie from favorites list|/users/[Username]/movies/[MovieID]|DELETE|none|
A JSON object structured like: <br />
{ <br />"_id": "xxxxxxxxxxxxxxxxxxxxxxxx", <br />"Username": "CoolDude475", <br />"Password": "CoolPassword89", <br />"Email": "cooldude475@gmail.com", <br />"Birthday": "yyyy-mm-dd", <br />"FavoriteMovies": [updated array], <br />"__v": 0 <br />}|
|Deregister user|/users/[Username]|DELETE|none|A text message reading: "[Username] was deregistered"|