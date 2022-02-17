const router = require('express').Router();
const { Recipes, Ingredients, Saved_recipes, User, User_recipes }  = require('../../models');

// router.get('/', async (req, res) => {
//     // Add a comment describing the purpose of the render method
//     // This method is rendering the 'all' Handlebars.js template. This is how we connect each route to the correct template.
    
    
//     res.send('cats');
//   });

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

// create loging acc
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) { res.status(400).json(err); }
});

//login session - user will initialize a session
router.post('/login', async (req, res) => {
  try {
      const userData = await User.findOne({ where: {email: req.body.email }});

      if(!userData){res.status(400).json({message: 'Incorrect email or password, please try again'}); return;}

      const validPassword = await userData.checkPassword(req.body.password);

      if(!validPassword){res.status(400).json({message: 'Incorrect email or password, please try again'}); return;}

      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          res.json({ user: userData, message: 'You are now logged in!' });
      });
  }
  catch (err){ res.status(500).json(err); }
});

//logout post - session will be destroied
router.post('/logout', (req, res) => {
  if (req.session.logged_in) { req.session.destroy(() => { 
          // res.json({message: 'You are now logged out!' }); res.status(204).end(); }); } 
          res.status(204).end(); }); } 
  else { res.status(404).end();}
});


module.exports = router;