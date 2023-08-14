const express = require("express");
const {
    getAllBlogsController,
    createBlogController,
    updateBlogController,
    getBlogByIdController,
    deleteBlogController,
    userBlogController,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/all-blogs", getAllBlogsController);

router.post("/create-blog", createBlogController);

router.put("/update-blog/:id", updateBlogController);

router.get("/get-blog/:id", getBlogByIdController);

router.delete("/delete-blog/:id", deleteBlogController);

router.get("/user-blog/:id", userBlogController);

module.exports = router;