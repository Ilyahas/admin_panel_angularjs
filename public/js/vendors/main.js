var app = angular.module("panel", ["ngRoute", "ngFileUpload"]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
    $routeProvider
        .when("/", {
            templateUrl: "../all_vacancies.html",
            controller: "CtrlPanel"
        })
        .when("/vacancy/edit/:vacancyId", {
            templateUrl: "../edit_vacancy.html",
            controller: "CtrlEditVacancy"
        })
        .when("/review/staff", {
            templateUrl: "../review.html",
            controller: "CtrlReview"
        })
        .when("/review/staff/edit/:reviewId", {
            templateUrl: "../edit_review.html",
            controller: "CtrlEditReview"
        })
        .when("/review/staff/add", {
            templateUrl: "../add_review.html",
            controller: "CtrlAddReview"
        })
        .when("/review/main", {
            templateUrl: "../main_review.html",
            controller: "CtrlReviewMain"
        })
        .when("/review/main/edit_first/:reviewId", {
            templateUrl: "../edit_review.html",
            controller: "CtrlEditFirstReviewMain"
        })
        .when("/review/main/edit_second/:reviewId", {
            templateUrl: "../edit_review.html",
            controller: "CtrlEditSecondReviewMain"
        })
        .when("/review/main/add_first", {
            templateUrl: "../add_review.html",
            controller: "CtrlAddFirstReviewMain"
        })
        .when("/review/main/add_second", {
            templateUrl: "../add_review.html",
            controller: "CtrlAddSecondReviewMain"
        })
        .when("/info", {
            templateUrl: "../doc.html"
        })
        .otherwise({
            templateUrl: "../all_vacancies.html",
            controller: "CtrlPanel"
        });
}]);

app.directive("reviewMainSecond", function(){
    return {
        template: '<div class="btn btn-primary load-block" ngf-select name="file" ngf-pattern="\'image/*\'"  accept="image/*" ngf-max-size="100MB" ngf-resize="{width: 393, height: 370, quality: 1, centerCrop: true}" ng-model="reviewsData.img">Загрузить</div> <div class="recomend">Рекомендуемый размер фотографии: 393x370 px</div>'
    };
});
app.directive("reviewMainFirst", function(){
    return {
        template: '<div class="btn btn-primary load-block" ngf-select name="file" ngf-pattern="\'image/*\'"  accept="image/*" ngf-max-size="100MB" ngf-resize="{width: 286, height: 381, quality: 1, centerCrop: true}" ng-model="reviewsData.img">Загрузить</div> <div class="recomend">Рекомендуемый размер фотографии: 286x381 px</div>'
    };
});
app.directive("reviewEdit", function(){
    return {
        template: '<div class="btn btn-primary load-block" ngf-select name="file" ngf-pattern="\'image/*\'"  accept="image/*" ngf-max-size="100MB" ngf-resize="{width: 393, height: 370, quality: 1, centerCrop: true}" ngf-resize-if="$width > 1000 || $height > 1000" ng-model="reviewsData.img">Загрузить</div>'
    };
});


var appFrame = angular.module("frame", ["panel", "ngRoute"]);
