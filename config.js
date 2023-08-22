const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "Ottos-MacBook-Pro.local",
      user: "root",
      password: "Nanners1",
      database: "sys",
      connectTimeout: 60000
    },
    listPerPage: 10,
  };
  module.exports = config;