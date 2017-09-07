var LocalStrategy = require('passport-local').Strategy;
var UniqueTokenStrategy = require('passport-unique-token').Strategy;
var fs = require('fs');
var jsonfile = require('jsonfile');
var bcrypt = require('bcryptjs');

module.exports = function(passport) {

    function getUsersByName(name){
        var users = JSON.parse(fs.readFileSync('./app/users.json'));
        for(var i = 0; i < users.users.length; ++i){
            if(users.users[i].username === name){
                return users.users[i];
            }
        }
        return null;
    }

    function getUserByToken(token){
        var users = JSON.parse(fs.readFileSync('./app/users.json'));
        for(var i = 0; i < users.users.length; ++i){
            if(users.users[i].token === token){
                return users.users[i];
            }
        }
        return null;
    }

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(name, done) {
        var user = getUsersByName(name);
        if(user) {
            done(null, user);
        }
        else {
            done("User did not find", user);
        }
    });

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true
            },
            function(req, username, password, done) {
                var user = getUsersByName(username);
                if(user === null) {
                    return done(null, false);
                }
                bcrypt.compare(password, user.password, function(err, res) {
                    if(res) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                });
            })
    );

    passport.use(new UniqueTokenStrategy(
        function (token, done) {
            var user = getUserByToken(token);
            if(user === null) {
                return done(null, false);
            }
            return done(null, user);
        }
    ));

};