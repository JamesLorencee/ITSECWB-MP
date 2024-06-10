const db = require("../util/database");

module.exports = class User {
  constructor(name, email, password, phoneNumber, photoFileName) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.photoFileName = photoFileName;
  }

  static find(email) {
    return new Promise((resolve, reject) => {
      db.execute(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            if (rows.length > 0) {
              resolve(rows[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }

  static save(user) {
    return db.execute(
      "INSERT INTO users (name, email, password, phoneNumber, photoFileName) VALUES (?, ? ,?, ?, ?)",
      [
        user.name,
        user.email,
        user.password,
        user.phoneNumber,
        user.photoFileName,
      ]
    );
  }
};
