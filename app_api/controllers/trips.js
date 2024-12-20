const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const User = require('../models/user');
const Model = mongoose.model('trips');

const getUser = async (req, res) => {
    console.log('GetUser called');
    console.log('Full request object keys:', Object.keys(req));
    console.log('Request auth:', req.auth);
    console.log('Authorization header:', req.headers.authorization);

    if (req.auth && req.auth.email) {
        try {
            const user = await User.findOne({ email: req.auth.email });
            if (!user) {
                console.log('No user found in database');
                return null;
            }
            return user;
        } catch(err) {
            console.log('Error in getUser: ', err);
            return null;
        }
    } else {
        console.log('No auth or email in request');
        return null;
    }
};

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        //Uncomment the following line to show results of the query
        //on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};


// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting cleint
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code': req.params.tripCode }) // Return single record
        .exec();

        //uncomment the following line to show results of query
        // on console
        // console.log(q);

    if(!q)
    {  // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    console.log('tripsAddTrip called');
    try {
        const user = await getUser(req, res);
        if (!user) {
            return res
                .status(404)
                .json({"message": "User not found"});
        } 

        console.log('Creating trip with body:', req.body);
        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        return res
            .status(201)
            .json(trip);
    } catch (err) {
        console.log('Error in tripsAddTrip:', err);
        return res
            .status(400)
            .json(err);
    }
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    try {
        const user = await getUser(req, res);
        if(!user) return;

        const trip = await Trip.findOneAndUpdate(
            {'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            {new : true}
        );

        if(!trip) {
            return res
                .status(404)
                .json({
                    message: "Trip not found with code " + req.params.tripCode
                });
        }

        return res.json(trip);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res
                .status(404)
                .json({
                    message: "Trip not found with code " + req.params.tripCode
                });
        }
        return res
            .status(500)
            .json(err);
    }
};




module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};