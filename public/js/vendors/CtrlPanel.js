app.controller("CtrlMenuBar", function($scope, $http, $location, $route){
    var linkArr = $location.path().split("/");
    linkArr.length = 3;

    $scope.a = ($location.path() === "" || $location.path() === "/") ? window.location.pathname : linkArr.join("/");
    $scope.showNav = false;

    $scope.pushToGit = function(){
        $(".sk-fading-circle").css("display", "inline-block");
        if($scope.a === "/" || $scope.a === "/vacancy/edit") {
            $scope.update();
        }
        $http.get("/saveOnGit").then(function (vacancies) {
            $(".sk-fading-circle").hide();
            showNotification("Сайт обновлен", "ti-github");
        }, function errorMsg(response) {
            $(".sk-fading-circle").hide();
            showNotification("Публикация не удалась", "ti-github", 3);
        });
    };

    // Undo/Redo
    $scope.command = new FileOperation($http);
    $scope.command.init();

    $scope.undo = function(){
        $scope.command.undo();
        $route.reload();
    };

    $scope.redo = function(){
        $scope.command.redo();
        $route.reload();
    };

});

appFrame.controller("CtrlMenuBarFrame", function($scope, $http, $route){
    $scope.showNav = true;

    $scope.command = new FileOperation($http);
    $scope.command.init();

    $scope.undo = function(){
        $scope.command.undo();
        $route.reload();
    };

    $scope.redo = function(){
        $scope.command.redo();
        $route.reload();
    };

    $scope.pushToGit = function(){
        $(".sk-fading-circle").css("display", "inline-block");
        $scope.update();
        $http.get("/saveOnGit").then(function (vacancies) {
            $(".sk-fading-circle").hide();
            showNotification("Сайт обновлен", "ti-github");
        }, function errorMsg(response) {
            $(".sk-fading-circle").hide();
            showNotification("Публикация не удалась", "ti-github", 3);
        });
    }
});

app.controller("CtrlPanel", function ($scope, $http, $window) {
    $scope.allVacancies = [];
    $http.post("/getAllVacancies").then(function (vacancies) {
        $scope.allVacancies = vacancies.data;
    });

    $scope.$parent.update = function(){
        var vacancies = {vacancy: $scope.allVacancies};
        $http.post("/updateCurrentVacancy", vacancies).then(function (response) {
            if(response.status === 200) {
                var activeVacancies = generateListOfActiveVacancies();
                $http.post("/updateFormVacancies", {msg: activeVacancies});
                $scope.$parent.command.init();
            }
        }, function errorMsg(response) {
            showNotification("Обновление формы не удалось", "", 3);
        });
    };

    window.addEventListener('message', function(event) {
        $http.post("/getAllVacancies").then(function (vacancies) {
            $scope.allVacancies = vacancies.data;
            checkAvailabilityOfVacancies(event.data);
            hideNotRecivedVacancies(event.data);
            $scope.update();
        });
    },false);

    function checkAvailabilityOfVacancies(str){
        var recievedVacancies = str.split(',');
        var titles = generateListOfCurrentVacancies();
        for(var i = 0; i < recievedVacancies.length; ++i){
            if(titles.indexOf(recievedVacancies[i]) === -1){
                $scope.allVacancies.push({link:recievedVacancies[i].replace(/ /g, "_").toLowerCase(), title: recievedVacancies[i], isActive: false, card_description:[{name:"",  info:[""]}]});
            }
        }
    }

    function hideNotRecivedVacancies(str){
        var recievedVacancies = str.split(',');
        var titles = generateListOfCurrentVacancies();
        for(var i = 0; i < titles.length; ++i){
            if(recievedVacancies.indexOf(titles[i]) === -1){
                $scope.allVacancies[i].isActive = false;
            }
        }
    }

    function generateListOfCurrentVacancies (){
        var newList = [];
        for(var i = 0; i < $scope.allVacancies.length; ++i){
            newList[newList.length] = $scope.allVacancies[i].title;
        }
        return newList;
    }

    function generateListOfActiveVacancies(){
        var str = "";
        for(var i = 0; i < $scope.allVacancies.length; ++i){
            if($scope.allVacancies[i].isActive) {
                str += $scope.allVacancies[i].title + ",";
            }
        }
        return str;
    }
});