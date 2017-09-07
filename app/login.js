exports.isNotAuthorized = function(req, res, next){
    if (!req.isAuthenticated() || req.user.byToken) {
        return next();
    }
    res.redirect('/');
};

exports.isLoggedInByPass = function(req, res, next) {
    if (req.isAuthenticated() && !req.user.byToken) {
        return next();
    }
    res.redirect('/login');
};

exports.isLoggedInByToken = function(req, res, next){
    if (req.isAuthenticated() && req.user.byToken ) {
        return next();
    }
    res.redirect('/login');
};

exports.isAuthorized = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};