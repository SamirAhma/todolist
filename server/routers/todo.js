const express = require("express");
const router = express();
const Todo = require("../model/Todo");
router.post("/add", async (req, res) => {
  const newTodo = new Todo({
    todo: req.body.todo,
  });
  try {
    const savedTodo = await newTodo.save();
    // await console.log(req.body);
    res.status(200).json(savedTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const todo = await Todo.find();
    // await console.log(req.body);
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/todo/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    // await console.log(req.body);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//UPDATE
router.put("/todo/:id", async (req, res) => {
  try {
    const updateProduct = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
