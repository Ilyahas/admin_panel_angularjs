var request = require('request');
var file = require('./file');

exports.getAllVacancies = function(req, res){
    res.send(file.getAllVacancy());
};

exports.updateCurrentVacancy = function(req, res){
    file.updateVacancy(req.body.vacancy);
    res.status(200).send('Vacancy was updated');
};

exports.getAllReviews = function(req, res){
    res.send(file.getAllReviews());
};

exports.updateCurrentReview = function(req, res){
    file.updateReview(req.body.review);
    res.status(200).send('Review was updated');
};

exports.getReviewsMain = function(req, res){
    res.send(file.getReviewsMain());
};

exports.updateReviewMain = function(req, res){
    file.updateReviewMain(req.body.review);
    res.status(200).send('Review was added');
};

exports.updateFormVacancies = function(req, res){
    request.post(
        'https://script.google.com/macros/s/AKfycbwjWXZOaJwxeymSvmUHsj1PkD-e774X7n8Fi7FG750t1jSdFZM/exec',
        { json: { token: "AdDsikvrQj7", positions: req.body.msg } },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
            }
        }
    );
};