const express = require('express');
const { createMovie, getMovie, updateMovie, deleteMovie } = require("../controllers");

const router = express.Router();

router.post("/create-movie", createMovie);
router.get("/get-movie/:id", getMovie);
router.put("/update-movie", updateMovie);
router.delete("/delete-movie/:id", deleteMovie);

module.exports = {
    router
}