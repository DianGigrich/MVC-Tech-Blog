

const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [{
        model:Comment,
        attributes: [
          'comment',
          'userId',
        ]
      },{
        model:User
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

router.post('/', async (req, res) => {
  if(!req.session.loggedIn){
    return res.status(401).json({msg:"You must first login."})
  }
  try {
    const newPost = await Post.create({
      title: req.body.title,
      post: req.body.post,
      UserId: req.session.userId,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post: req.body.post,
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

router.delete('/:id', async (req, res) => {
  if(!req.session.loggedIn){
    return res.status(401).json({msg:"login first joetato!"})
  }
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        UserId: req.session.UserId,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;