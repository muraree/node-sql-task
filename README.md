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

*Assuming that Node is already installed on your PC.

To get the project running on your PC you have to first do:
git clone https://github.com/muraree/node-sql-task.git on the 
terminal.

After that get into the project directory and then you have to do 
"npm install".

Then "npm start" to start the project.

Note- Only server side implementation is done so you will not see any
graphical window on browser.

"Any feedbacks for improvement are appreciated."