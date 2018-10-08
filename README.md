NODE-SQL TASK

Overview:

The task basically deals with user having their locks which can be accessed 
by them only.User can register and login and can also update and delete himself.He/She can create multiple locks but having unique lock name.
He/She can also access other users but not their locks.

Technologies Used:

- Express framework for writing backend code.
- MySql database for storing and retreving data.
- Sequelize ORM tool for setting connection and to communicate with database.
- Jwt for security and authentication.
- bcrypt for encrypting the passwords.

Functionality inside:

- Sign Up with username and password.
- User should be able to log in using his username and password.
- Authorized user should be able to update his name and birhtDate.
- User should be able to delete himself from the system.
- User should be able to create a new lock providing name (duplicated lock names not allowed).
- User should be able to change the names of his locks.
- User should be able to delete his locks.
- User should be able to get his locks (as list, by id, by macId).
- User should be able to get other users (as list, by id, by username). locks should not be visible to other users (only authorized user can access his locks)
- User should be able to get his model by hitting simple route like /me or user/me.

Getting Started

For setup on local you have to change the databse connection credentials in the db.js file yourself with db host name, port, username, password and database name.
 
* For running testcases your have to configure db in your local device.

For production :

* I have deployed app on heroku here is url :
https://node-sql-task.herokuapp.com

I have tested it with postman.

Note- Only server side implementation is done so you will not see any
graphical window on browser.

API Urls:
- Register user: POST: /api/user/register , params: {username, firstName,    lastName, password, birthDate}
- Login user: POST: /api/user/login , params: {username, password}
- Update users: PUT: /api/users/:id, headers: { 'x-access-token': token } params: {id}
- Delete users: DELETE: /api/users/:id, headers: { 'x-access-token': token } params: {id}
- Get user: GET: /api/users/me, headers: { 'x-access-token': token }
- Get users: GET: /api/users, headers: { 'x-access-token': token } query: {username}
- Get users by id: GET: /api/users/:userid, headers: { 'x-access-token': token }
- Create Locks: POST: /api/locks/create, headers: { 'x-access-token': token }params:{name, userid(refernce to user model with id)}
- Update Locks: PUT: /api/locks/:lockid, headers: { 'x-access-token': token } params: {lockid}
- Delete Locks: DELETE: /api/locks/:lockid, headers: { 'x-access-token': token } params: {lockid}
- Get Locks: GET: /api/locks, headers: { 'x-access-token': token } query:{id or macid}

"Any feedbacks for improvement are appreciated."