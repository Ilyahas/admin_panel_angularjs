var path = require('path');
var passport = require("passport");
var push = require('git-push');
var cmd = require('node-cmd');

var gitPull = 'git pull origin master';
var cmdGitCommit = 'git add --all && git commit -m "Updated from ' + new Date().toJSON().slice(0,16) + '" && git push origin master';

exports.main = function(req, res, next){
    cmd.get(
        'cd freshcodeit.github.io/ && ' + gitPull,
        function(err, data, stderr){
            if(!err) {
                console.log(data);
                next();
            }
            else {
                console.log(stderr);
                res.status(400).send("bad request");
            }
        }
    );
};

exports.loadPageMain = function(req, res){
    res.sendFile(path.join(__dirname + '/../content/main.html'));
};

exports.loadPageFrame = function(req, res){
    res.sendFile(path.join(__dirname + '/../content/frame.html'));
};

exports.login = function(req, res){
    res.render('index-login', {title: "Login - Admin Panel - Freshcode", layout: false});
};

exports.loginPost = function(req, res, next){
    passport.authenticate('local-login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            res.status(401);
            res.render('index-login', {title: "Login - Admin Panel - Freshcode", layout: false, error: true});
            return;
        }
        req.login(user.username, function(error) {
            if (error) return next(error);
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.loginToken = function(req, res, next){
    req.login(req.user.username, function(error) {
        if (error) return next(error);
        return res.redirect('/frame/');
    });
};

exports.logout = function(req, res){
    req.logout();
    res.redirect('/login');
};


exports.saveOnGit = function(req, res, next){
    cmd.get(
        'cd freshcodeit.github.io/ && ' + cmdGitCommit,
        function(err, data, stderr){
            if(!err) {
                console.log(data);
                res.status(200).send("pushed to github");
            }
            else {
                console.log(stderr);
                next();
            }
        }
    );
};

exports.fixGitConflict = function(req, res){
    cmd.get(
        'git submodule update --remote && cd freshcodeit.github.io/ && git checkout master && ' + gitPull + cmdGitCommit + ' && git push origin master',
        function(err, data, stderr){
            if(!err) {
                console.log(data);
                res.status(200).send("pushed to github");
            }
            else {
                console.log(stderr);
                res.status(400).send("bad request");
            }
        }
    );
};