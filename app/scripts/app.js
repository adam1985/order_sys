define(["angular", "controller/mainController", "directive/mainDirective", "service/mainService"], function (angular) {
    return angular.module('webapp', [
        'ui.router',
        'webapp.controller',
        'webapp.directive',
        'webapp.service'
    ])
    .controller("orderManage", ["$scope","$templateCache", function($scope, $templateCache){
            $templateCache.removeAll();
    }])

    .controller("orderIndex", ["$scope","$templateCache", function($scope, $templateCache){
           $templateCache.removeAll();
    }]);
});