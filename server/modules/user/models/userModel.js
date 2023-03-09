const db = require('../../../database');

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async save() {
    try {
      const result = await db.query('INSERT INTO users SET ?', this);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
        const rows = await db.query('SELECT * FROM users WHERE email = ?', email);
        
        if (rows.length > 0) {
        return new User(rows[0].username, rows[0].email, rows[0].password);
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findByUsername(username) {
    try {
      const rows = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length > 0) {
        const { username, email, password } = rows[0];
        return new User(username, email, password);
      }
      return null;
    } catch (error) {
      throw error;
    }
  }


}



module.exports = User;
