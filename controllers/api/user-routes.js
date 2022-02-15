const router = require('express').Router();
// const { User } = require('../../models');

router.get('/', async (req, res) => {
    // Add a comment describing the purpose of the render method
    // This method is rendering the 'all' Handlebars.js template. This is how we connect each route to the correct template.
    
    
    res.send('cats');
  });

// router.post('/', async (req, res) => {
//     try {
//       const dbUserData = await User.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//       });
  
//       // Set up sessions with a 'loggedIn' variable set to `true`
//       req.session.save(() => {
//         req.session.loggedIn = true;
  
//         res.status(200).json(dbUserData);
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });


module.exports = router;