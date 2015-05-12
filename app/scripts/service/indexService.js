define(["./serviceMod"], function (serviceMod) {
    return serviceMod.
        value("resourceConfig",
            {
                order: {
                    listAction: "/order/list"
                }
            }
        ).
        factory("remoteResource", ["$http", "resourceConfig", function($http, resourceConfig){
            return {
                getOrderList: function(data){
                    data = data || {};
                    data = angular.extend(data, {});
                    return $http.get(resourceConfig.order.listAction, {params:data});
                }
            }
        }]);
});

