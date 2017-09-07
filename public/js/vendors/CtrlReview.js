app.controller("CtrlReview", function ($scope, $http) {
    $scope.reviewsData = [];

    $http.post("/getAllReviews").then(function (reviews) {
        $scope.reviewsData = reviews.data;
    });

    $scope.deleteReview = function(index){
        $scope.reviewsData.reviews.splice(index, 1);
        $http.post("/updateCurrentReview", {review: $scope.reviewsData}).then(function (reviews) {
            $scope.$parent.command.init();
            showNotification('Отзыв удален', 'ti-check');
        });
    };
});

app.controller("CtrlEditReview", function ($scope, $http, $window, $routeParams, Upload) {
    $scope.section="main";
    $scope.reviewsData = {};
    $scope.oldImage = "";

    $http.post("/getAllReviews").then(function (reviews) {
        $scope.reviewsData = reviews.data.reviews[$routeParams.reviewId];
        $scope.oldImage = $scope.reviewsData.img;
    });

    $scope.update = function(){
        if($scope.oldImage !== $scope.reviewsData.img){
            $scope.upload();
        }
        else {
            $scope.saveChanges($scope.reviewsData.img);
        }
    };

    $scope.upload = function(){
        upload(Upload, $scope.saveChanges, $scope.reviewsData);
    };

    $scope.saveChanges = function(img){
        $scope.reviewsData.img = (img.$ngfDataUrl) ? img.$ngfDataUrl : img;
        $http.post("/getAllReviews").then(function (reviews) {
            var reviewsFile = reviews.data;
            reviewsFile.reviews[$routeParams.reviewId] = $scope.reviewsData;
            var newReviews = {review: reviewsFile};
            $http.post("/updateCurrentReview", newReviews).then(function (reviews) {
                $scope.$parent.command.init();
                showNotification('Отзыв изменён', 'ti-check');
                $window.location.href = "#/review/staff";
            });
        });
    }
});

app.controller("CtrlAddReview", function ($scope, $http, $window, Upload) {
    $scope.section = "main";
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
        $http.post("/getAllReviews").then(function (reviews) {
            var reviewFile = reviews.data;
            reviewFile.reviews.push($scope.reviewsData);
            var reviewForAdd = {review: reviewFile};
            $http.post("/updateCurrentReview", reviewForAdd).then(function (response) {
                $scope.$parent.command.init();
                showNotification('Отзыв добавлен', 'ti-check');
                $window.location.href = "#/review/staff";
            });
        });
    };
});

function upload(Upload, call, reviewData) {
    if(reviewData.name === "" || reviewData.title === "" || reviewData.text === ""){
        showNotification("Заполните все поля", "ti-pencil-alt", 3);
        return;
    }
    if (reviewData.img === "") {
        showNotification("Добавьте картинку", "ti-gallery", 3);
        return;
    }
    Upload.upload({
        url: '/upload',
        data: {file: img}
    }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        img = "/images/" + img.name;
        call(img);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
        $('.alert').show();
    }, function (evt) {
        $('.alert').hide();
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        $('.progress').show();
        $('.progress .progress-bar').css("width", progressPercentage + "%");
    });
}
