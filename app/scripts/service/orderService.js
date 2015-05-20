define(["./serviceMod"], function (serviceMod) {
    return serviceMod.

        factory("orderResource", ["$resource",  function($resource){
            return  $resource('/order/list', {}, {
                read: {method:'GET', url: '/order/getdetail'},
                readAll: {method: 'POST'},
                create: {
                    method: 'post',
                    url: '/order/add'
                },
                update: {method: 'POST', url: '/order/add'},
                delete: {method: 'GET'}
            });

        }])

        .factory("aderGroupResource", ["$resource",  function($resource){
            return  $resource('/order/getcompany');
        }]);
});