define(["./serviceMod"], function (serviceMod) {
    return serviceMod.
        factory("orderResource", ["$resource",  function($resource){
            return  $resource('/order/list', {}, {
                    read: {method:'GET'},
                    readAll: {method: 'GET', cache: false},
                    create: {method: 'POST'},
                    update: {method: 'POST'},
                    delete: {method: 'GET'}
            });

        }]);
});

