var handler = require('./queriesHandler');
var log = require('./login');

module.exports = function(app) {

    app.post('/getAllVacancies', log.isAuthorized, handler.getAllVacancies);

    app.post('/updateCurrentVacancy', log.isAuthorized, handler.updateCurrentVacancy);

    app.post('/getAllReviews', log.isLoggedInByPass, handler.getAllReviews);

    app.post('/updateCurrentReview', log.isLoggedInByPass, handler.updateCurrentReview);

    app.post('/getReviewsMain', log.isLoggedInByPass, handler.getReviewsMain);

    app.post('/updateReviewMain', log.isLoggedInByPass, handler.updateReviewMain);

    app.post('/updateFormVacancies', log.isAuthorized, handler.updateFormVacancies);

};