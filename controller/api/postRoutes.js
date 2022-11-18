const express = require("express");
const router = express.Router();
const { Post, Comment} = require("../models")


// router.get("/", (req, res) => {
//   Post.findAll({
//     attributes:["name","isCute"],
//     include:[{
//       model:Owner,
//       attributes:["username"]
//     }]
//   })
//     .then((allPosts) => {
//       res.json(allPosts);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ err: err });
//     });
// });
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [{
        model:Comment
      }]
    });
    res.json(allPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }

});

router.get("/:id", (req, res) => {
  Post.findByPk(req.params.id)
    .then((onePost) => {
      res.json(onePost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  Post.create({
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
  Post.update(
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
    .then((updatedPost) => {
      if (updatedPost[0] === 0) {
        return res.status(404).json({ msg: "no Post found!" });
      }
      res.json(updatedPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delPost) => {
      if (delPost === 0) {
        return res.status(404).json({ msg: "no Post found!" });
      }
      res.json(delPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;