# TopAPI
**Endpoints:** <br>
1. http://localhost:xxxx/users <br>
&emsp; **GET** -> *Returns all users* <br>
&emsp; **POST** -> *Creates a new user with data from call body* <br><br>

2. http://localhost:xxxx/users/:uuid <br>
&emsp; **GET** -> Returns specified user data based on uuid parameter <br>
&emsp; **DELETE** -> Deletes specified user data based on uuid parameter <br><br>

3. http://localhost:xxxx/users/:uuid/matches <br>
&emsp; **GET** -> Returns all matches for specified user <br>
&emsp; **POST** -> Creates new match for specified user based on body of call<br><br>
