var mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function(app) {
/* GET register. */
app.get('/user/reg', function(req, res, next) {
  console.log('[register get]');
  res.render('user/register', {title: '用户注册'});
});

/* POST register. */
app.post('/user/reg', function(req, res, next) {
  console.log('[register post]');

  User.register(new User(req.body.user), req.body.user.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('user/register', {title: '用户注册'});
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });

  /*var userEntity = new UserModel(req.body.user);
  userEntity.save(function(err) {
    if(!err) {
      console.log('注册成功.');
      res.redirect('/');
    } else {
      console.log(err.message);
    }
  });*/
  next();
});
}
//module.exports = router;