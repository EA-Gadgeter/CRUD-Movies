const { db } = require("../firebase");

// CRUD

// Create
const createMovie = async (req, res) => {
    try {
        const { body: movie } = req;

        const moviesDB = db.collection("movies");
        const { _path: { segments } } = await moviesDB.add(movie);
        const id = segments[1];

        res.send({
            status: 200,
            id,
        })
    } catch (error) {
        console.log(error);
    }
};

// Read
const getMovie = async (req, res) => {
    try {
        const { params: { id } } = req;
        const moviesDB = db.collection("movies").doc(id);

        const { _fieldsProto: { rating, name, author, time } } = await moviesDB.get();

        res.send({
            status: 200,
            rating: rating.stringValue,
            name: name.stringValue,
            author: author.stringValue,
            time: time.stringValue,
        })
    } catch (error) {
        console.log(error);
    }
};

// Update
const updateMovie = async (req, res) => {
    try {
        const { body: { id, name, author, time, rating } } = req;
        const movieDB = db.collection("movies").doc(id);

        movieDB.update({
            author,
            name,
            rating,
            time
        });

        res.send({
            status: 200,
            id
        });

    } catch (error) {
        console.log(error);
    }
};

// Delete
const deleteMovie = async (req, res) => {
    try {
        const { params: { id } } = req;
        await db.collection("movies").doc(id).delete();

        res.send({
            status: 200,
            id
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie
}