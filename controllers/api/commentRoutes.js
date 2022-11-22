const express = require("express");
const router = express.Router();
const { Comment, User, Post} = require("../../models")

router.get("/", async (req, res) => {
  try {
    const allcoments = await Comment.findAll({
      include:[{
        model: User
      }]
    });
    res.json(allcoments);
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

router.post("/", (req, res) => {
  console.log(req.body);
  Comment.create({
    comment: req.body.comment
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
      comment: req.body.comment,
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