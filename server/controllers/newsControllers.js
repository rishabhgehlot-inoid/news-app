const { v4: uuidv4 } = require("uuid");
const { createTable, insertRecord } = require("../utils/sqlFunctions");
const newsSchema = require("../schemas/newsSchema");
const fs = require("fs");
const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config);
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.createNews = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(403).json({ errors: result.array() });
  }
  const { title, description } = req.body;
  const path = `${Date.now()}.png`;
  const token = req.headers["token"];

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  console.log(userId);
  fs.writeFile(`public/${path}`, req.file.buffer, (err) => {
    if (err) throw err;
  });

  if (!title || !description) {
    res.status(400).json({
      error: "title, description or poster fields cannot be empty!",
    });
  }
  const news = {
    newsId: uuidv4(),
    title,
    description,
    poster: path,
    user: userId,
    createAt: new Date(),
    updateAt: new Date(),
  };
  try {
    await createTable(newsSchema);
    await insertRecord("news", news);
    res.status(201).json({ message: "News created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNews = async (req, res) => {
  const token = req.headers["token"];
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  let searchQuery = req.query.search;
  let page = req.query.page || 1;
  let skip = (page - 1) * 4;
  console.log(searchQuery);

  if (!userId) res.status(400).json(" unauthorized");
  try {
    let query = "SELECT * FROM news WHERE user = ?";
    if (searchQuery)
      query = `SELECT * FROM news WHERE user = ?  && title LIKE '%${searchQuery}%' OR description LIKE '%${searchQuery}%';`;
    if (page)
      query = `SELECT * FROM news WHERE user = ? && title LIKE '%${searchQuery}%' OR description LIKE '%${searchQuery}%'  LIMIT ? OFFSET ?;`;
    await pool.query(query, [userId, 4, skip], (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getJoints = async (req, res) => {
  // const token = req.headers["token"];
  // console.log(token);
  // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // const userId = decodedToken.userId;

  // if (!userId) res.status(400).json(" unauthorized");
  try {
    let query =
      "SELECT * FROM news INNER JOIN users ON news.user = users.userId;";
    await pool.query(query, (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getLeftJoints = async (req, res) => {
  // const token = req.headers["token"];
  // console.log(token);
  // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // const userId = decodedToken.userId;

  // if (!userId) res.status(400).json(" unauthorized");
  try {
    let query =
      "SELECT * FROM news LEFT JOIN users ON news.user = users.userId;";
    await pool.query(query, (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getRightJoints = async (req, res) => {
  // const token = req.headers["token"];
  // console.log(token);
  // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // const userId = decodedToken.userId;

  // if (!userId) res.status(400).json(" unauthorized");
  try {
    let query =
      "SELECT * FROM users RIGHT JOIN news ON news.user = users.userId;";
    await pool.query(query, (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getFullJoints = async (req, res) => {
  // const token = req.headers["token"];
  // console.log(token);
  // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // const userId = decodedToken.userId;

  // if (!userId) res.status(400).json(" unauthorized");
  try {
    let query =
      "SELECT * FROM users RIGHT JOIN news ON news.user = users.userId UNION SELECT * FROM users RIGHT JOIN news ON news.user = users.userId;";
    await pool.query(query, (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getTotalNews = async (req, res) => {
  // const token = req.headers["token"];
  // console.log(token);
  // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // const userId = decodedToken.userId;

  // if (!userId) res.status(400).json(" unauthorized");
  try {
    let query = "SELECT COUNT(newsId) as count FROM news;";
    await pool.query(query, (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getTotalUsers = async (req, res) => {
  // const token = req.headers["token"];
  // console.log(token);
  // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // const userId = decodedToken.userId;

  // if (!userId) res.status(400).json(" unauthorized");
  try {
    let query = "SELECT COUNT(userId) as count FROM users;";
    await pool.query(query, (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getNewsById = async (req, res) => {
  const token = req.headers["token"];
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  if (!userId) res.status(400).json(" unauthorized");
  const id = req.params.id;
  try {
    const query = `SELECT * FROM news WHERE newsId= "${id}"`;
    await pool.query(query, (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteNews = async (req, res) => {
  const token = req.headers["token"];
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  if (!userId) res.status(400).json(" unauthorized");
  const newsId = req.params.id;
  try {
    const query = `DELETE FROM news WHERE newsId = ?;`;
    pool.query(query, [newsId], (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log(results);
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateNews = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(403).json({ errors: result.array() });
  }
  const token = req.headers["token"];
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  if (!userId) res.status(400).json(" unauthorized");
  const newsId = req.params.id;
  const { title, description } = req.body;
  const path = `${Date.now()}.png`;

  try {
    fs.writeFile(`public/${path}`, req.file.buffer, (err) => {
      if (err) throw err;
    });
    const query = `UPDATE news SET  title = ? , description = ?, poster= ? WHERE newsId = ? `;
    await pool.query(
      query,
      [title, description, path, newsId],
      (err, results) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(results);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
