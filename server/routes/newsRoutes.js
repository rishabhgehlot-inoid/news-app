const express = require("express");
const {
  createNews,
  getNews,
  deleteNews,
  updateNews,
  getNewsById,
  getJoints,
  getLeftJoints,
  getRightJoints,
  getFullJoints,
  getTotalNews,
  getTotalUsers,
} = require("../controllers/newsControllers");
const { query, validationResult, body } = require("express-validator");
const { upload } = require("../db/multerConfig");
const { newsValidation } = require("../middleware/newsValidation");
const router = express.Router();
router.get("/getnewsjoints", getJoints);
router.get("/getnewsleftjoints", getLeftJoints);
router.get("/getnewsrightjoints", getRightJoints);
router.get("/getnewsFulljoints", getFullJoints);
router.get("/getTotalNews", getTotalNews);
router.get("/getTotalUsers", getTotalUsers);
router.post("/", newsValidation, upload.single("poster"), createNews);
router.get("/", getNews);
router.delete("/delete/:id", deleteNews);
router.put("/:id", newsValidation, upload.single("poster"), updateNews);
router.get("/:id", getNewsById);

module.exports = router;
