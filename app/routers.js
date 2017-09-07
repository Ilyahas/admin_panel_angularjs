var handler = require('./routersHandler');
var log = require('./login');


module.exports = function(app, passport) {

    app.get('/', log.isLoggedInByPass, handler.main, handler.loadPageMain);

    app.get('/frame', log.isLoggedInByToken, handler.main, handler.loadPageFrame);

    app.get('/login', log.isNotAuthorized, handler.login);

    app.post('/login', handler.loginPost);

    app.get('/login/:token', passport.authenticate('token'), handler.loginToken);

    app.get('/logout', handler.logout);

    app.get('/saveOnGit', log.isAuthorized, handler.saveOnGit, handler.fixGitConflict);

};