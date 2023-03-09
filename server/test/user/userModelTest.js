// test.js

const User = require('../../modules/user/models/userModel');

const user = new User('username', 'email@example.com', 'password');

user.save()
  .then(insertId => {
    console.log(`User with ID ${insertId} has been saved to database.`);
  })
  .catch(error => {
    console.error(error);
  });
