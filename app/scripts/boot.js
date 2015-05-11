define(['jquery','angular-material',"bootstrap-material", "bootstrap-ripples",  'angular-ui-router', './app', './routes'], function($, angular) {
    angular.element(function(){
        $.material.init();
        angular.bootstrap(document, ['webapp']);
    });
});