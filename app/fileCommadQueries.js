var log = require('./login');
var file = require('./file');

module.exports = function(app) {

    var save = {
        HISTORY: [],
        TRASH: []
    };

    app.post("/changeSave", log.isAuthorized, function(req, res){
        save = req.body.save;
        file.updateVacancy(save.HISTORY[save.HISTORY.length-1].vacancies);
        file.updateReview(save.HISTORY[save.HISTORY.length-1].reviews);
        file.updateReviewMain(save.HISTORY[save.HISTORY.length-1].reviewsMain);
        res.status(200).send("saved");
    });

    app.post("/getSave", log.isAuthorized, function(req, res){
        save.HISTORY.push({vacancies: file.getAllVacancy(), reviews: file.getAllReviews(), reviewsMain: file.getReviewsMain()});
        res.send(save);
    });

};