const router = require("express").Router();
const Task = require("../models/Task");

//CREATE TASK
router.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE TASK
router.put("/:id", async (req, res) => {
  try {
    console.log("Toggle Done Being Run")
      try {
        const updatedPost = await Task.findOneAndUpdate(
          {_id:req.params.id},
          [ { "$set": { "done": { "$eq": [false, "$done"] } } } ]
        );
        console.log("Response being sent from update")
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
});



//DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
      try {
        await task.delete();
        res.status(200).json("Task has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }

  } catch (err) {
    res.status(500).json(err);
  }
});

//GET TASK
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET ALL Tasks
router.get("/", async (req, res) => {
  console.log('Running GET Tasks')
  try {
    let tasks = await Task.find();
    
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
