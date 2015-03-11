module.exports = function(app) {
	app.get('/user/login', function(req, res) {
	  console.log('[login get]');
	  res.render('user/login', {title: 'Login Page'});
    });

    app.post('/user/login', function(req, res) {
	  console.log('[login post]');
	  var user = req.body.user;
	  console.log(user);
  	  User.find(user, function(err, docs) {
	    console.log('Error:' + err);
	    if(!err) {
		  if(docs != '') {
	        console.log(docs);
			return res.redirect('/');
		  } else {
			console.log('login failed');
			return res.redirect('/login');
		  }
		} else {
		  console.log('something happened.');
		}
	  });
  	});
 };