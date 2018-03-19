module.exports = function (app, db) {
  const User = require('../models/user.model');
  const Note = require('../models/note.model');
  const Init = require('../authenticate/init');
  const passport = require('passport');
  const mongoose = require('mongoose');

  app.use(require('express-session')({
    key: 'session',
    secret: 'SUPER SECRET SECRET',
    store: require('mongoose-session')(mongoose)
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/postRegistration', checkData(), (req, res) => {
    res.send('');
  });

  app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send('login');
  });

  app.get('/getToDo', authenticationMiddleware(), (req, res) => {
    console.log(req.user);
    Note.findOne({ username: req.user.username }, function (err, obj) {
      res.send(obj.note);
    });
  });

  function authenticationMiddleware () {
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');
    };
  }

  app.post('/addnote', authenticationMiddleware(), (req, res) => {
    Note.findOne({username: req.user.username}, function (err, obj) {
      obj.note.text.push(req.body.text);
      obj.note.isThrough.push(req.body.isThrough);
      obj.save(function (err) {
        if (err) return console.log(err);
        res.send(obj.note);
      });
    });
  });

  app.post('/editnote', authenticationMiddleware(), (req, res) => {

    Note.findOne({ username: req.user.username }, function (err, obj) {
      obj.note.text.splice(req.body.itemNumber, 1, req.body.text);
      obj.save(function (err) {
        if (err) return console.log(err);
        res.send(obj.note);
      });
    });
  });

  app.post('/turncheck', authenticationMiddleware(), (req, res) => {
    Note.findOne({ username: req.user.username }, function (err, obj) {
      obj.note.isThrough.splice(req.body.itemNumber, 1, !obj.note.isThrough[req.body.itemNumber])
      obj.save(function (err) {
        if (err) return console.log(err);
        res.send(obj.note);
      });
    });
  });
  app.post('/deletenote', authenticationMiddleware(), (req, res) => {
    Note.findOne({ username: req.user.username }, function (err, obj) {
      obj.note.text.splice(req.body.itemNumber, 1);
      obj.note.isThrough.splice(req.body.itemNumber, 1);
      obj.save(function (err) {
        if (err) return console.log(err);
        res.send(obj.note);
      });
    });
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.send('sdfsfgsg');
  });

  function checkData () {
    return function (req, res, next) {
      let answer = {};

      let reEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (req.body.email.match(reEmail) === null) {
        answer.validateEmail = 'невалидный email ';
      }
      let reUsername = /^[\w]{3,}$/;
      console.log(req.body.username.match(reUsername));
      if (req.body.username.match(reUsername) === null) {
        answer.validateUsername = 'невалидный ник';
      }
      let rePassword = /^[\w]{3,}$/;
      if (req.body.password.match(rePassword) === null) {
        answer.validatePassword = 'невалидный пароль';
      }

      User.findOne({ email: req.body.email })
        .then((obj) => {
          if (obj !== null) {
            answer.email = 'такой email уже существет';
          }
          User.findOne({ username: req.body.username })
            .then((obj) => {
              if (obj !== null) {
                answer.username = 'такой юзер уже существет';
              }
              if (req.body.password !== req.body.confPass) {
                answer.password = 'пароли не совпадают';
              }
              if (Object.keys(answer).length) {
                console.log('error', answer);
                return answer;
              } else {
                var user = new User({
                  email: req.body.email,
                  password: req.body.password,
                  username: req.body.username
                });
                var note = new Note({
                  username: req.body.username
                });

                user.save(function (err) {
                  if (err) return console.log(err);
                });
                note.save(function (err) {
                  if (err) return console.log(err);
                });
                return next();
              }
            })
            .catch(function (error) {
              console.log('catch', error);
            });
        })
      .catch(function (error) {
        console.log('catch', error);
      });
    };
  }
};
