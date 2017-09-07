app.controller("CtrlEditVacancy", function ($scope, $routeParams, $http, $window) {
    $scope.allVacancies = [];
    $scope.editVacancy = {
        link: "",
        title: "",
        isActive: true,
        card_description: [{
            name: "",
            info: []
        }]
    };

    $scope.savedIndexLine = 1;
    $scope.savedIndexLineParent = 1;
    $scope.savedBlockIndex = 1;

    $http.post("/getAllVacancies").then(function (vacancies) {
        $scope.allVacancies = vacancies.data;
        $scope.editVacancy = {
            link: vacancies.data[$routeParams.vacancyId].link,
            title: vacancies.data[$routeParams.vacancyId].title,
            isActive: vacancies.data[$routeParams.vacancyId].isActive,
            card_description: vacancies.data[$routeParams.vacancyId].card_description
        };
    });


    $scope.saveIndex = function(index, parentindex){
        $scope.savedIndexLine = index;
        $scope.savedIndexLineParent = parentindex;
    };

    $scope.saveBlockIndex = function(index){
        $scope.savedBlockIndex = index;
    };


    $scope.addLine = function(parentindex){
        $scope.editVacancy.card_description[parentindex].info.push("");
    };

    $scope.deleteLine = function(){
        $scope.editVacancy.card_description[$scope.savedIndexLineParent].info.splice($scope.savedIndexLine, 1);
    };

    $scope.deleteBlock = function(){
        $scope.editVacancy.card_description.splice($scope.savedBlockIndex, 1);
    };

    $scope.addBlock = function(){
        $scope.editVacancy.card_description.push({name: "", info:[""]});
    };


    $scope.update = function(){
        $http.post("/getAllVacancies").then(function (vacancies) {
            var allVacancy = vacancies.data;
            allVacancy[$routeParams.vacancyId] = $scope.editVacancy;
            var newVacancy = {vacancy: allVacancy};
            $http.post("/updateCurrentVacancy", newVacancy).then(function (response) {
                $scope.$parent.command.init();
                showNotification('Вакансия изменена', 'ti-check');
                $window.location.href = "#/";
            });
        });
    };

    $scope.up = function(index){
        console.log($scope.editVacancy);
        var temp = $scope.editVacancy.card_description[index];
        $scope.editVacancy.card_description[index] = $scope.editVacancy.card_description[index-1];
        $scope.editVacancy.card_description[index-1] = temp;
    };

    $scope.down = function(index){
        var temp = $scope.editVacancy.card_description[index];
        $scope.editVacancy.card_description[index] = $scope.editVacancy.card_description[index+1];
        $scope.editVacancy.card_description[index+1] = temp;
    }
});