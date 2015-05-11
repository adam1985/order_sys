define(["angular", "controller/mainController", "directive/mainDirective", "service/mainService"], function (angular) {
    return angular.module('webapp', [
        'ui.router',
        'webapp.controller',
        'webapp.directive',
        'webapp.service'
    ])
    .controller("orderManage", ["$scope", function($scope){

    }])

    .controller("orderEdit", ["$scope", function($scope){

    }]);
});