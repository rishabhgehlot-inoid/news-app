const newsSchema = `
  CREATE TABLE IF NOT EXISTS news (
      newsId VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description LONGTEXT,
      poster VARCHAR(255) NOT NULL,
      user VARCHAR(255),
      FOREIGN KEY (user) references users(userId),
      createAt DATE,
      updateAt DATE
  );
`;

module.exports = newsSchema;
