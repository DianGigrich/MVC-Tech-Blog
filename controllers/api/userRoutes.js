const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');
const bcrypt = require("bcrypt")


router.get("/", (req, res) => {
  User.findAll({
    include: [{
      model: Post,
      attributes: ["title", "post", "createdAt"]
    }, {
      model: Comment
    }]

  }).then(users => {
    res.json(users)
  }).catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
})
//signup
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});


//login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(foundUser => {
    if (!foundUser) {
      //wrong username
      return res.status(401).json({ msg: "invalid login!" })
    } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      //wrong password
      return res.status(401).json({ msg: "invalid login!" })
    } else {
      req.session.userId = foundUser.id;
      req.session.loggedIn = true;
      res.json(foundUser);
    }
  }).catch(err => {
    console.log(err)
    res.status(500).json({ err })

  })

})

//logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/")
})
module.exports = router;
