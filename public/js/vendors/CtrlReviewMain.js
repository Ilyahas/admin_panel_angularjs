app.controller("CtrlReviewMain", function ($scope, $http) {
    $scope.reviewsMan = [];
    $scope.reviewsWoman = [];

    $http.post("/getReviewsMain").then(function (reviews) {
        $scope.reviewsMan = reviews.data.horizontal_cards;
        $scope.reviewsWoman = reviews.data.vertical_cards;
    });

    $scope.deleteFromFirstSection = function(index){
        $scope.reviewsMan.splice(index, 1);
        saveChanges(true);
    };

    $scope.deleteFromSecondSection = function(index){
        $scope.reviewsWoman.splice(index, 1);
        saveChanges(false);
    };

    function saveChanges(isFirst){
        $http.post("/getReviewsMain").then(function (reviews) {
            var reviewsFile = reviews.data;
            (isFirst) ? reviewsFile.horizontal_cards = $scope.reviewsMan :
                reviewsFile.vertical_cards = $scope.reviewsWoman;
            var newReviews = {review: reviewsFile};
            $http.post("/updateReviewMain", newReviews).then(function (reviews) {
                $scope.$parent.command.init();
                showNotification('Отзыв удален', 'ti-check');
            });
        });
    }
});

app.controller("CtrlEditFirstReviewMain", function ($scope, $http, $window, $routeParams, Upload) {
    $scope.section="first";
    $scope.reviewsData = [];
    $scope.oldImage = "";

    $http.post("/getReviewsMain").then(function (reviews) {
        $scope.reviewsData = reviews.data.horizontal_cards[$routeParams.reviewId];
        $scope.oldImage = $scope.reviewsData.img;
    });

    $scope.update = function(){
        if($scope.oldImage !== $scope.reviewsData.img){
            upload(Upload, $scope.saveChanges, $scope.reviewsData);
        }
        else {
            $scope.saveChanges($scope.reviewsData.img);
        }

    };

    $scope.saveChanges = function(img){
        $scope.reviewsData.img = (img.$ngfDataUrl) ? img.$ngfDataUrl : img;
        $http.post("/getReviewsMain").then(function (reviews) {
            var reviewsFile = reviews.data;
            reviewsFile.horizontal_cards[$routeParams.reviewId] = $scope.reviewsData;
            var newReviews = {review: reviewsFile};
            $http.post("/updateReviewMain", newReviews).then(function (reviews) {
                $scope.$parent.command.init();
                showNotification('Отзыв изменён', 'ti-check');
                $window.location.href = "#/review/main";
            });
        });
    };
});

app.controller("CtrlEditSecondReviewMain", function ($scope, $http, $window, $routeParams, Upload) {
    $scope.section="second";
    $scope.reviewsData = [];
    $scope.oldImage = "";

    $http.post("/getReviewsMain").then(function (reviews) {
        $scope.reviewsData = reviews.data.vertical_cards[$routeParams.reviewId];
        $scope.oldImage = $scope.reviewsData.img;
    });

    $scope.update = function(){
        if($scope.oldImage !== $scope.reviewsData.img){
            upload(Upload, $scope.saveChanges, $scope.reviewsData);
        }
        else {
            $scope.saveChanges($scope.reviewsData.img);
        }
    };

    $scope.saveChanges = function(img){
        $scope.reviewsData.img = (img.$ngfDataUrl) ? img.$ngfDataUrl : img;
        $http.post("/getReviewsMain").then(function (reviews) {
            var reviewsFile = reviews.data;
            reviewsFile.vertical_cards[$routeParams.reviewId] = $scope.reviewsData;
            var newReviews = {review: reviewsFile};
            $http.post("/updateReviewMain", newReviews).then(function (reviews) {
                $scope.$parent.command.init();
                showNotification('Отзыв изменён', 'ti-check');
                $window.location.href = "#/review/main";
            });
        });
    };
});

app.controller("CtrlAddFirstReviewMain", function ($scope, $http, $window, Upload) {
    $scope.section="first";

    $scope.reviewsData = {
        img: "",
        text: "",
        name: "",
        title: ""
    };

    $scope.addReview = function(){
        upload(Upload, $scope.saveReview, $scope.reviewsData);
    };

    $scope.saveReview = function(img){
        $scope.reviewsData.img = img;
        $http.post("/getReviewsMain").then(function(reviews){
            var reviewFile = reviews.data;
            reviewFile.horizontal_cards.push($scope.reviewsData);
            var reviewForAdd = {review: reviewFile};
            $http.post("/updateReviewMain", reviewForAdd).then(function(response){
                $scope.$parent.command.init();
                showNotification('Отзыв добавлен', 'ti-check');
                $window.location.href = "#/review/main";
            });
        });
    };
});

app.controller("CtrlAddSecondReviewMain", function ($scope, $http, $window, Upload) {
    $scope.section="second";

    $scope.reviewsData = {
        img: "",
        text: "",
        name: "",
        title: ""
    };

    $scope.addReview = function(){
        upload(Upload, $scope.saveReview, $scope.reviewsData);
    };

    $scope.saveReview = function(img){
        $scope.reviewsData.img = img;
        $http.post("/getReviewsMain").then(function(reviews){
            var reviewFile = reviews.data;
            reviewFile.vertical_cards.push($scope.reviewsData);
            var reviewForAdd = {review: reviewFile};
            $http.post("/updateReviewMain", reviewForAdd).then(function(response){
                $scope.$parent.command.init();
                showNotification('Отзыв добавлен', 'ti-check');
                $window.location.href = "#/review/main";
            });
        });
    };
});

