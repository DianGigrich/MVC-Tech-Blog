const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
        moder:User,
        attributes: { exclude: ['password'] },
      },{
        model:Comment
      }],
      order: [['createdAt', 'ASC']],
    });

    const users = postData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect(`/user/${req.session.userId}`)
  }
  res.render("signup", {
    loggedIn: false,
    userId: null
  })
})

router.get("/user/:id", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.redirect(`/login`)
    }
    const userData = await User.findByPk(req.params.id, {
      include: [{
        model: Post,
        attributes: ["title", "post", "createdAt", "CommentId"]
      }, {
        model: Comment
      }]
    })

    const frontData = userData.map((campaign) =>
      campaign.get({ plain: true })
    );

    res.render("dashboard", {
      users: frontData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;