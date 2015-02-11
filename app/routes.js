module.exports = function(app) {
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
		console.log("indexing...");
	});
	// server routes ===========================================================
	var Motion = require('./models/motion');
	// handle things like api calls
	app.get('/api', function(req, res) {
		 res.json({ message: 'hooray! welcome to api!' });   
	});
	app.get('api/motions', function(req, res){
		Motion.find({name: req.param.motion}, function(err, motion){
			if (err) {throw err;};
		})
		console.log('GET motion of '+ motion);
	    res.send(req.params.motion);
	});
	app.post('api/motions', function(req, res) {
    	var newMotion = Motion({
    		name: req.body.name,
    		motionData : req.body.motionData
    	});
    	console.log(newMotion);
    	newMotion.save(function(err){
    		if (err) { throw err;};
    		console.log('New motion added to db');
    	});
    });



	app.get('/api/:version', function(req, res) {
    	res.send(req.params.version);
  	});

  	// parameter middleware that will run before the next routes
	app.param('name', function(req, res, next, name) {

	    // check if the user with that name exists
	    // do some validations
	    // add -dude to the name
	    var modified = name + '-dude';

	    // save name to the request
	    req.name = modified;

	    next();
	});

	// http://localhost:8080/api/users/chris
	app.get('/api/users/:name', function(req, res) {
    	// the user was found and is available in req.user
    	res.send('What is up ' + req.name + '!');
	});

	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
		console.log("indexing ;)");
	});

};