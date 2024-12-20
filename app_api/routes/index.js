const express = require('express'); // Express app
const router = express.Router();    // Router logic
const { expressjwt: jwt } = require('express-jwt');

//Adding debug to middleware to log auth status
const debugAuth = (req,res, next) => {
    console.log('Debug Auth Middleware:');
    console.log('Headers:', req.headers);
    console.log('Auth:', req.auth);
    next();
};

const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: 'auth'
});

// This is where we import the controllers we will route
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

//authentication routes
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes tripList
    .post(auth, debugAuth, tripsController.tripsAddTrip); //POST Method Adds a Trip

// GET method routes tripsFindByCode - requires param
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, debugAuth, tripsController.tripsUpdateTrip);

// Test     
router
    .route('/test')
    .get((req, res) => {
        res.status(200).json({message: 'API is working'});
    });
    
module.exports = router;