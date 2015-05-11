define(["./app"], function (app) {
    return app
        .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider){
            $urlRouterProvider.when("", "/manage");
            $stateProvider
                .state("manage", {
                    url: "/manage",
                    templateUrl: "tpl/order_manage.html",
                    controller: "orderManage"
                })
                .state("edit", {
                    url:"/edit",
                    templateUrl: "tpl/edit_order.html",
                    controller: "orderEdit"
                })
        }]);
});



