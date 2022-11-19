

const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [{
        model:Comment
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
  if(!req.session.logged_in){
    return res.status(401).json({msg:"You must first login."})
  }
  try {
    const newProject = await Project.create({
      title: req.body.title,
      post: req.body.post,
      UserId: req.session.UserId,
    });

    res.status(200).json(newProject);
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
  if(!req.session.logged_in){
    return res.status(401).json({msg:"login first joetato!"})
  }
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        UserId: req.session.UserId,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;