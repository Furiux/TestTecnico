const { Router } = require("express");
const _ = require('underscore');

const router = Router();

const Movies = require("../models/movies");
const Clasification = require("../models/clasification");

router.get("/movies", async (req, res) => {
  try {
    const data = await Movies.find({}, { __v: 0 }).populate('clasification').sort({name: 'asc'});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/clasification", async (req, res) => {
  try {
    const data = await Clasification.find({}, { __v: 0 }).sort({name: 'asc'});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


router.post("/new-movie", async (req, res) => {
  const { name, director, clasification } = req.body;
  try {
    const newMov = new Movies({ name, director, clasification });
    const newMovie = await newMov.save();
    res.status(201).json({ _id: newMovie._id, name: newMovie.name, director: newMovie.director, clasification: newMovie.Clasification });
  } catch (err) {
    res.status(400).json(err.message);
  }
});


router.post("/new-clasification", async (req, res) => {
  const { name } = req.body;
  try {
    const newCla = new Clasification({ name });
    const newClasification = await newCla.save();
    res.status(201).json({ _id: newClasification._id, name: newClasification.name });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete("/remove-movie", async (req, res) => {
  const { id } = req.body;
  try {
    const data = await Movies.findByIdAndRemove(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/remove-clasification", async (req, res) => {
  const { id } = req.body;
  try {
    const data = await Clasification.findByIdAndRemove(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.patch('/modify-movies', async (req, res) => {

  let id = req.body.id;
  
  const body = _.pick(req.body,['name', 'director', 'clasification']);
  
  await Movies.findByIdAndUpdate(id, body, {new: true, runValidators: true }, (err, colaboradorDB) => {

      if (err) {
          return res.status(500).json(err.message);
      }

      return res.status(201).json(colaboradorDB);

  });

});

router.patch('/modify-clasification', async (req, res) => {

  let id = req.body.id;
  
  const body = _.pick(req.body,['name']);
  
  await Clasification.findByIdAndUpdate(id, body, {new: true, runValidators: true }, (err, colaboradorDB) => {

      if (err) {
          return res.status(500).json(err.message);
      }

      return res.status(201).json(colaboradorDB);

  });

});



module.exports = router;
