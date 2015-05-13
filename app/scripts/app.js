define(["angular-material", "directive/mainDirective", "service/mainService", "controller/mainController"], function (angular) {
    return angular.module('webapp', [
        'ui.router',
        'webapp.service',
        'webapp.directive',
        'webapp.controller'
    ])
    .controller("orderManage", ["$scope","$templateCache", function($scope, $templateCache){
            $templateCache.removeAll();
    }])

    .controller("orderIndex", ["$scope","$templateCache", function($scope, $templateCache){
           $templateCache.removeAll();
    }]);
});