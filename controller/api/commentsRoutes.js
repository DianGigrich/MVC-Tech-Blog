const express = require("express");
const router = express.Router();
const { Comment, Post} = require("../models")


// router.get("/", (req, res) => {
//   Comment.findAll({
//     attributes:["name","isCute"],
//     include:[{
//       model:Owner,
//       attributes:["username"]
//     }]
//   })
//     .then((allComment) => {
//       res.json(allComment);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ err: err });
//     });
// });
router.get("/", async (req, res) => {
  try {
    const allComment = await Comment.findAll();
    res.json(allComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }

});

router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id)
    .then((oneComment) => {
      res.json(oneComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

router.Comment("/", (req, res) => {
  console.log(req.body);
  Comment.create({
    name: req.body.name,
    species: req.body.species,
    age: req.body.age,
    isCute: req.body.isCute,
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

router.put("/:id", (req, res) => {
  Comment.update(
    {
      name: req.body.name,
      species: req.body.species,
      age: req.body.age,
      isCute: req.body.isCute,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedComment) => {
      if (updatedComment[0] === 0) {
        return res.status(404).json({ msg: "no Comment found!" });
      }
      res.json(updatedComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delComment) => {
      if (delComment === 0) {
        return res.status(404).json({ msg: "no Comment found!" });
      }
      res.json(delComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;