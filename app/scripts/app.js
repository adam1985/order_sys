define(['jquery', "angular-material", "directive/mainDirective", "service/mainService", "controller/mainController"], function ($, angular) {
    return angular.module('webapp', [
        'ui.router',
        'webapp.service',
        'webapp.directive',
        'webapp.controller',
        'chieffancypants.loadingBar'
    ])
    .config(["$httpProvider", function($httpProvider){
            // 头部配置
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
            $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
            $httpProvider.defaults.transformRequest = function(data) {
                var isObj = angular.isObject(data);
                return isObj ? $.param(data) : data;
            };

    }])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
    }])
    .controller("orderManage", ["$scope","$templateCache", function($scope, $templateCache){
            $templateCache.removeAll();
    }])

    .controller("orderIndex", ["$scope","$templateCache", function($scope, $templateCache){
           $templateCache.removeAll();
    }]);
});