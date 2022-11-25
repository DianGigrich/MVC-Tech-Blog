const router = require('express').Router();
const { User, Post, Comment } = require('../models');


// home
router.get('/', async (req, res) => {

  try {
     const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        {
          model: Comment
        }
      ],
      order: [['createdAt', 'ASC']],
    });

    const userposts = postData.map((project) => project.get({ plain: true }));
    const userData = await User.findAll({
      exclude: ['password']
    })
    const users = userData.map((project) => project.get({ plain: true }));
    res.render('homepage', {
      posts: userposts,
      user: users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// signup
router.get("/signup", (req, res) => {
   if (req.session.loggedIn) {
    return res.redirect(`/user/${req.session.userId}`)
  }
  res.render("signup", {});
});

// post comment
router.get("/post/:id", async (req, res) => {
  if(!req.session.loggedIn){
    return res.redirect('/login')
  }
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{
        model: Comment,
      }, {
        model: User
      }
      ]
    })

    const hbsData = postData.toJSON();
    hbsData.loggedIn = req.session.loggedIn
    res.render("postcomment", hbsData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// dashboard
router.get("/user/:id", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.redirect(`/login`)
    }
    const userData = await User.findByPk(req.params.id, {
      include: [{
        model: Post
      }]
    })

    const hbsData = userData.toJSON();
    console.log(hbsData)
    hbsData.loggedIn = req.session.loggedIn
    res.render("dashboard", hbsData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
