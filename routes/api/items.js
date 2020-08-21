const express = require("express");
const router = express.Router();

// Item Model ==> untuk CRUD
const Item = require("../../models/Item.js");

// @route GET api/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
  // Fetch
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// @desc Create A Post
// @access Public
router.post("/", (req, res) => {
  // Insert
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route Delete api/items/:id
// @desc Delete An Item
// @access Public
router.delete("/:id", (req, res) => {
  // Delete
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// export default router;
module.exports = router;
