define(["./app"], function (app) {
    return app
        .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider){
            $urlRouterProvider.when("", "/order/index");
            $stateProvider
                .state("manage", {
                    url: "/order/manage",
                    templateUrl: "tpl/order/manage.html",
                    controller: "orderManage"
                })
                .state("index", {
                    url:"/order/index",
                    templateUrl: "tpl/order/index.html",
                    controller: "orderIndex",
                    resolve: {

                    }
                })
        }]);
});



